(function() {
  define(['./utils', './collection'], function(utils, collection) {
    "use strict";
    var Event, delegateEvents, eventSplitter, eventsApi, implementation, listenMethods, method, triggerEvents;
    Event = {
      withEvent: function() {
        var method, _i, _len, _ref, _results;
        _ref = ['on', 'off', 'once', 'delegate_on', 'delegate_off', 'trigger'];
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
        this._listeners || (this._listeners = {});
        events = this._listeners[name] || (this._listeners[name] = []);
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
        if (!this._listeners || !eventsApi(this, 'off', name, [callback, context])) {
          return this;
        }
        if (!name && !callback && !context) {
          this._listeners = void 0;
          return this;
        }
        names = name ? [name] : Object.keys(this._listeners);
        for (i = _i = 0, _len = names.length; _i < _len; i = ++_i) {
          name = names[i];
          if ((events = this._listeners[name])) {
            this._listeners[name] = retain = [];
            if (callback || context) {
              for (j = _j = 0, _len1 = events.length; _j < _len1; j = ++_j) {
                ev = events[j];
                if ((callback && callback !== ev.callback && callback !== ev.callback._callback) || (context && context !== ev.context)) {
                  retain.push(ev);
                }
              }
            }
            if (!retain.length) {
              delete this._listeners[name];
            }
          }
        }
        return this;
      },
      delegate_on: function(delegator) {
        this._delegators || (this._delegators = new collection.List());
        this._delegators.append(delegator);
        return this;
      },
      delegate_off: function(delegator) {
        if (!this._delegators) {
          return this;
        }
        this._delegators.remove(delegator);
        return this;
      },
      delegate: function() {
        var event, listeners, listenersForAll;
        if (this._delegators && this._delegators.size() > 0) {
          delegateEvents(this._delegators, arguments);
        }
        if (!this._listeners) {
          return this;
        }
        event = arguments[arguments.length - 1];
        event.deliverer = this;
        listeners = this._listeners[event.name];
        listenersForAll = this._listeners.all;
        if (listeners) {
          triggerEvents(listeners, arguments);
        }
        if (listenersForAll) {
          triggerEvents(listenersForAll, arguments);
        }
        return this;
      },
      trigger: function(name) {
        var args, listeners, listenersForAll;
        args = [].slice.call(arguments, 1);
        args.push({
          origin: this,
          name: name,
          deliverer: this
        });
        if (this._delegators && this._delegators.size() > 0) {
          delegateEvents(this._delegators, args);
        }
        if (!this._listeners) {
          return this;
        }
        if (!eventsApi(this, 'trigger', name, args)) {
          return this;
        }
        listeners = this._listeners[name];
        listenersForAll = this._listeners.all;
        if (listeners) {
          triggerEvents(listeners, args);
        }
        if (listenersForAll) {
          triggerEvents(listenersForAll, args);
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
    triggerEvents = function(listeners, args) {
      var ev, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = listeners.length; _i < _len; _i++) {
        ev = listeners[_i];
        _results.push(ev.callback.apply(ev.ctx, args));
      }
      return _results;
    };
    delegateEvents = function(delegators, args) {
      return delegators.forEach(function(delegator) {
        return Event.delegate.apply(delegator, args);
      });
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
