(function() {
  define(['./utils'], function(utils) {
    "use strict";
    var Event, eventSplitter, eventsApi, implementation, listenMethods, method, slice, triggerEvents;
    slice = [].slice;
    Event = {
      withEvent: function() {
        var method, _i, _len, _ref, _results;
        _ref = ['on', 'off', 'once', 'trigger'];
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          method = _ref[_i];
          _results.push(this[method] = Event[method]);
        }
        return _results;
      },
      on: function(name, callback, context) {
        var events;
        if (!eventsApi(this, 'on', name, [callback, context]) || !callback) {
          return this;
        }
        this._events || (this._events = {});
        events = this._events[name] || (this._events[name] = []);
        events.push({
          callback: callback,
          context: context,
          ctx: context || this
        });
        return this;
      },
      once: function(name, callback, context) {
        var once, self;
        if (!eventsApi(this, 'once', name, [callback, context]) || !callback) {
          return this;
        }
        self = this;
        once = utils.once(function() {
          self.off(name, once);
          return callback.apply(this, arguments);
        });
        once._callback = callback;
        return this.on(name, once, context);
      },
      off: function(name, callback, context) {
        var ev, events, i, j, names, retain, _i, _j, _len, _len1;
        if (!this._events || !eventsApi(this, 'off', name, [callback, context])) {
          return this;
        }
        if (!name && !callback && !context) {
          this._events = void 0;
          return this;
        }
        names = name ? [name] : Object.keys(this._events);
        for (i = _i = 0, _len = names.length; _i < _len; i = ++_i) {
          name = names[i];
          if ((events = this._events[name])) {
            this._events[name] = retain = [];
            if (callback || context) {
              for (j = _j = 0, _len1 = events.length; _j < _len1; j = ++_j) {
                ev = events[j];
                if ((callback && callback !== ev.callback && callback !== ev.callback._callback) || (context && context !== ev.context)) {
                  retain.push(ev);
                }
              }
            }
            if (!retain.length) {
              delete this._events[name];
            }
          }
        }
        return this;
      },
      trigger: function(name) {
        var allEvents, args, events;
        if (!this._events) {
          return this;
        }
        args = slice.call(arguments, 1);
        if (!eventsApi(this, 'trigger', name, args)) {
          return this;
        }
        events = this._events[name];
        allEvents = this._events.all;
        if (events) {
          triggerEvents(events, args);
        }
        if (allEvents) {
          triggerEvents(allEvents, arguments);
        }
        return this;
      },
      stopListening: function(obj, name, callback) {
        var id, listeningTo, remove;
        listeningTo = this._listeningTo;
        if (!listeningTo) {
          return this;
        }
        remove = !name && !callback;
        if (!callback && typeof name === 'object') {
          callback = this;
        }
        if (obj) {
          (listeningTo = {})[obj._listenId] = obj;
        }
        for (id in listeningTo) {
          obj = listeningTo[id];
          obj.off(name, callback, this);
          if (remove || _.isEmpty(obj._events)) {
            delete this._listeningTo[id];
          }
        }
        return this;
      }
    };
    eventSplitter = /\s+/;
    eventsApi = function(obj, action, name, rest) {
      var key, names, val, _i, _len;
      if (!name) {
        return true;
      }
      if (typeof name === 'object') {
        for (key in name) {
          val = name[key];
          obj[action].apply(obj, [key, val].concat(rest));
        }
        return false;
      }
      if (eventSplitter.test(name)) {
        names = name.split(eventSplitter);
        for (_i = 0, _len = names.length; _i < _len; _i++) {
          val = names[_i];
          obj[action].apply(obj, [val].concat(rest));
        }
        return false;
      }
      return true;
    };
    triggerEvents = function(events, args) {
      var ev, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = events.length; _i < _len; _i++) {
        ev = events[_i];
        _results.push(ev.callback.apply(ev.ctx, args));
      }
      return _results;
    };
    listenMethods = {
      listenTo: 'on',
      listenToOnce: 'once'
    };
    for (method in listenMethods) {
      implementation = listenMethods[method];
      Event[method] = function(obj, name, callback) {
        var id, listeningTo;
        listeningTo = this._listeningTo || (this._listeningTo = {});
        id = obj._listenId || (obj._listenId = utils.uniqueId('l'));
        listeningTo[id] = obj;
        if (!callback && typeof name === 'object') {
          callback = this;
        }
        obj[implementation](name, callback, this);
        return this;
      };
    }
    return Event;
  });

}).call(this);
