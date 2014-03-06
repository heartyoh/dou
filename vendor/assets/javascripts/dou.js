/*! Dou v0.0.10 | (c) Hatio, Lab. | MIT License */
(function(context) {
  var factories = {}, loaded = {};
  var isArray = Array.isArray || function(obj) {
    return obj.constructor == Array;
  };

  var map = Array.map || function(arr, fn, scope) {
    for (var i = 0, len = arr.length, result = []; i < len; i++) {
      result.push(fn.call(scope, arr[i]));
    }
    return result;
  };

  function define() {
    var args = Array.prototype.slice.call(arguments), dependencies = [], id, factory;
    if (typeof args[0] == 'string') {
      id = args.shift();
    }
    if (isArray(args[0])) {
      dependencies = args.shift();
    }
    factory = args.shift();
    factories[id] = [dependencies, factory];
  }

  function require(id) {
    function resolve(dep) {
      var relativeParts = id.split('/'), depParts = dep.split('/'), relative = false;
      relativeParts.pop();
      while (depParts[0] == '..' && relativeParts.length) {
        relativeParts.pop();
        depParts.shift();
        relative = true;
      }
      if (depParts[0] == '.') {
        depParts.shift();
        relative = true;
      }
      if (relative) {
        depParts = relativeParts.concat(depParts);
      }
      return depParts.join('/');
    }

    var unresolved, factory, dependencies;
    if (typeof loaded[id] == 'undefined') {
      unresolved = factories[id];
      if (unresolved) {
        dependencies = unresolved[0];
        factory = unresolved[1];
        loaded[id] = factory.apply(undefined, map(dependencies, function(id) {
          return require(resolve(id));
        }));
      }
    }

    return loaded[id];
  }

(function () {
    var __slice = [].slice, __hasProp = {}.hasOwnProperty;
    define('build/js/utils', [], function () {
        'use strict';
        var DEFAULT_INTERVAL, idCounter;
        DEFAULT_INTERVAL = 100;
        idCounter = 0;
        return {
            merge: function () {
                var extenders, key, other, target, val, _i, _len;
                target = arguments[0], extenders = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
                if (!target || typeof target === !'object') {
                    target = {};
                }
                for (_i = 0, _len = extenders.length; _i < _len; _i++) {
                    other = extenders[_i];
                    for (key in other) {
                        if (!__hasProp.call(other, key))
                            continue;
                        val = other[key];
                        if (typeof val !== 'object') {
                            target[key] = val;
                        } else {
                            target[key] = this.merge(target[key], val);
                        }
                    }
                }
                return target;
            },
            push: function (base, extra, protect) {
                var key, val;
                if (!base || !extra) {
                    return base;
                }
                for (key in extra) {
                    if (!__hasProp.call(extra, key))
                        continue;
                    val = extra[key];
                    if (base[key] && protect) {
                        throw new Error('utils.push attempted to overwrite "' + key + '" while running in protected mode');
                    }
                    if (typeof base[key] === 'object' && typeof extra[key] === 'object') {
                        this.push(base[key], extra[key]);
                    } else {
                        base[key] = extra[key];
                    }
                }
                return base;
            },
            isEnumerable: function (obj, property) {
                return Object.keys(obj).indexOf(property) > -1;
            },
            compose: function () {
                var funcs;
                funcs = arguments;
                return function () {
                    var args, i, _i, _ref;
                    args = arguments;
                    for (i = _i = _ref = funcs.length - 1; _ref <= 0 ? _i <= 0 : _i >= 0; i = _ref <= 0 ? ++_i : --_i) {
                        args = funcs[i].apply(this, args);
                    }
                    return args[0];
                };
            },
            uniqueArray: function (array) {
                var a, item, u, _i, _len;
                u = {};
                a = [];
                for (_i = 0, _len = array.length; _i < _len; _i++) {
                    item = array[_i];
                    if (u.hasOwnProperty(item)) {
                        continue;
                    }
                    a.push(item);
                    u[item] = 1;
                }
                return a;
            },
            debounce: function (func, wait, immediate) {
                var result, timeout;
                if (typeof wait !== 'number') {
                    wait = DEFAULT_INTERVAL;
                }
                timeout = 0;
                result = null;
                return function () {
                    var args, callNow, context, later;
                    context = this;
                    args = arguments;
                    later = function () {
                        timeout = null;
                        if (!immediate) {
                            return result = func.apply(context, args);
                        }
                    };
                    callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    if (callNow) {
                        result = func.apply(context, args);
                    }
                    return result;
                };
            },
            throttle: function (func, wait) {
                var args, context, more, result, throttling, timeout, whenDone;
                if (typeof wait !== 'number') {
                    wait = DEFAULT_INTERVAL;
                }
                context = args = timeout = throttling = more = result = null;
                whenDone = this.debounce(function () {
                    return more = throttling = false;
                }, wait);
                return function () {
                    var later;
                    context = this;
                    args = arguments;
                    later = function () {
                        timeout = null;
                        if (more) {
                            result = func.apply(context, args);
                        }
                        return whenDone();
                    };
                    if (!timeout) {
                        timeout = setTimeout(later, wait);
                    }
                    if (throttling) {
                        more = true;
                    } else {
                        throttling = true;
                        result = func.apply(context, args);
                    }
                    whenDone();
                    return result;
                };
            },
            countThen: function (num, base) {
                return function () {
                    if (!--num) {
                        return base.apply(this, arguments);
                    }
                };
            },
            delegate: function (rules) {
                return function (e, data) {
                    var parent, selector, target;
                    target = $(e.target);
                    parent = null;
                    for (selector in rules) {
                        if (!__hasProp.call(rules, selector))
                            continue;
                        if (!e.isPropagationStopped() && (parent = target.closest(selector)).length) {
                            data = data || {};
                            data.el = parent[0];
                            return rules[selector].apply(this, [
                                e,
                                data
                            ]);
                        }
                    }
                };
            },
            once: function (func) {
                var ran, result;
                ran = false;
                result = null;
                return function () {
                    if (ran) {
                        return result;
                    }
                    result = func.apply(this, arguments);
                    ran = true;
                    return result;
                };
            },
            uniqueId: function (prefix) {
                var id;
                id = ++idCounter + '';
                if (prefix) {
                    return prefix + id;
                } else {
                    return id;
                }
            },
            clone: function (obj) {
                var flags, key, newInstance;
                if (obj == null || typeof obj !== 'object') {
                    return obj;
                }
                if (obj instanceof Date) {
                    return new Date(obj.getTime());
                }
                if (obj instanceof RegExp) {
                    flags = '';
                    if (obj.global != null) {
                        flags += 'g';
                    }
                    if (obj.ignoreCase != null) {
                        flags += 'i';
                    }
                    if (obj.multiline != null) {
                        flags += 'm';
                    }
                    if (obj.sticky != null) {
                        flags += 'y';
                    }
                    return new RegExp(obj.source, flags);
                }
                newInstance = new obj.constructor();
                for (key in obj) {
                    newInstance[key] = this.clone(obj[key]);
                }
                return newInstance;
            }
        };
    });
}.call(this));
(function () {
    var __hasProp = {}.hasOwnProperty;
    define('build/js/debug', [], function () {
        'use strict';
        var ALL, byName, byNameContains, byType, byValue, byValueCoerced, custom, defaultActionsFilter, defaultEventNamesFilter, filterEventLogsByAction, filterEventLogsByName, global, hideAllEventLogs, logFilter, retrieveLogFilter, saveLogFilter, search, showAllEventLogs, tests, traverse;
        global = typeof window === 'undefined' ? {} : window;
        traverse = function (comparator, clue, options) {
            var obj, path, prop, _results;
            options = options || {};
            obj = options.obj || global;
            path = options.path || (obj === global ? 'global' : '');
            _results = [];
            for (prop in obj) {
                if (!__hasProp.call(obj, prop))
                    continue;
                if ((tests[comparator] || comparator)(clue, obj, prop)) {
                    console.log('' + path + '.' + prop + ' -> (' + typeof obj[prop] + ')', obj[prop]);
                }
                if (obj[prop] && typeof obj[prop] === 'object' && obj[prop] !== obj) {
                    _results.push(traverse(comparator, clue, {
                        obj: obj[prop],
                        path: '' + path + '.' + prop
                    }));
                } else {
                    _results.push(void 0);
                }
            }
            return _results;
        };
        search = function (comparator, expected, clue, options) {
            if (!expected || typeof clue === expected) {
                return traverse(comparator, clue, options);
            } else {
                return console.error('' + clue + ' must be ' + expected);
            }
        };
        tests = {
            name: function (clue, obj, prop) {
                return clue === prop;
            },
            nameContains: function (clue, obj, prop) {
                return prop.indexOf(clue) > -1;
            },
            type: function (clue, obj, prop) {
                return obj[prop] instanceof clue;
            },
            value: function (clue, obj, prop) {
                return obj[prop] === clue;
            },
            valueCoerced: function (clue, obj, prop) {
                return obj[prop] == clue;
            }
        };
        byName = function (clue, options) {
            return search('name', 'string', clue, options);
        };
        byNameContains = function (clue, options) {
            return search('nameContains', 'string', clue, options);
        };
        byType = function (clue, options) {
            return search('type', 'function', clue, options);
        };
        byValue = function (clue, options) {
            return search('value', null, clue, options);
        };
        byValueCoerced = function (clue, options) {
            return search('valueCoerced', null, clue, options);
        };
        custom = function (comparator, options) {
            return traverse(comparator, null, options);
        };
        filterEventLogsByAction = function () {
            var actions;
            actions = [].slice.call(arguments);
            logFilter.eventNames.length || (logFilter.eventNames = ALL);
            logFilter.actions = actions.length ? actions : ALL;
            return saveLogFilter();
        };
        filterEventLogsByName = function () {
            var eventNames;
            eventNames = [].slice.call(arguments);
            logFilter.actions.length || (logFilter.actions = ALL);
            logFilter.eventNames = eventNames.length ? eventNames : ALL;
            return saveLogFilter();
        };
        hideAllEventLogs = function () {
            logFilter.actions = [];
            logFilter.eventNames = [];
            return saveLogFilter();
        };
        showAllEventLogs = function () {
            logFilter.actions = ALL;
            logFilter.eventNames = ALL;
            return saveLogFilter();
        };
        saveLogFilter = function () {
            if (global.localStorage) {
                global.localStorage.setItem('logFilter_eventNames', logFilter.eventNames);
                return global.localStorage.setItem('logFilter_actions', logFilter.actions);
            }
        };
        retrieveLogFilter = function () {
            var key, result, value;
            result = {
                eventNames: global.localStorage && global.localStorage.getItem('logFilter_eventNames') || defaultEventNamesFilter,
                actions: global.localStorage && global.localStorage.getItem('logFilter_actions') || defaultActionsFilter
            };
            for (key in result) {
                if (!__hasProp.call(result, key))
                    continue;
                value = result[key];
                if (typeof value === 'string' && value !== ALL) {
                    result[key] = value.split('.');
                }
            }
            return result;
        };
        ALL = 'all';
        defaultEventNamesFilter = [];
        defaultActionsFilter = [];
        logFilter = retrieveLogFilter();
        return {
            enable: function (enable) {
                this.enabled = !!enable;
                if (enable && global.console) {
                    console.info('Booting in DEBUG mode');
                    console.info('You can configure event logging with DEBUG.events.logAll()/logNone()/logByName()/logByAction()');
                }
                return global.DEBUG = this;
            },
            find: {
                byName: byName,
                byNameContains: byNameContains,
                byType: byType,
                byValue: byValue,
                byValueCoerced: byValueCoerced,
                custom: custom
            },
            events: {
                logFilter: logFilter,
                logByAction: filterEventLogsByAction,
                logByName: filterEventLogsByName,
                logAll: showAllEventLogs,
                logNone: hideAllEventLogs
            }
        };
    });
}.call(this));
(function () {
    var __hasProp = {}.hasOwnProperty;
    define('build/js/compose', [
        './utils',
        './debug'
    ], function (utils, debug) {
        'use strict';
        var canWriteProtect, dontLock, e, mixin, setPropertyWritability, unlockProperty;
        canWriteProtect = debug.enabled && !utils.isEnumerable(Object, 'getOwnPropertyDescriptor');
        dontLock = [
            'mixedIn',
            'mixingIn'
        ];
        if (canWriteProtect) {
            try {
                Object.getOwnPropertyDescriptor(Object, 'keys');
            } catch (_error) {
                e = _error;
                canWriteProtect = false;
            }
        }
        setPropertyWritability = function (obj, isWritable) {
            var desc, key, props;
            if (!canWriteProtect) {
                return;
            }
            props = Object.create(null);
            for (key in obj) {
                if (!__hasProp.call(obj, key))
                    continue;
                if (dontLock.indexOf(key < 0)) {
                    desc = Object.getOwnPropertyDescriptor(obj, key);
                    desc.writable = isWritable;
                    props[key] = desc;
                }
            }
            return Object.defineProperties(obj, props);
        };
        unlockProperty = function (obj, prop, op) {
            var writable;
            if (!canWriteProtect || !obj.hasOwnProperty(prop)) {
                return op.call(obj);
            }
            writable = Object.getOwnPropertyDescriptor(obj, prop).writable;
            Object.defineProperties(obj, prop, { writable: true });
            op.call(obj);
            return Object.defineProperties(obj, prop, { writable: writable });
        };
        mixin = function (base, mixins) {
            var _i, _len;
            if (!(mixins instanceof Array)) {
                return this.mixin(base, [mixins]);
            }
            base.mixedIn = base.hasOwnProperty('mixedIn') ? base.mixedIn : [];
            base.mixingIn = base.hasOwnProperty('mixingIn') ? base.mixingIn : [];
            setPropertyWritability(base, false);
            for (_i = 0, _len = mixins.length; _i < _len; _i++) {
                mixin = mixins[_i];
                if (!(base.mixedIn.indexOf(mixin) === -1)) {
                    continue;
                }
                if (base.mixingIn.indexOf(mixin) > -1) {
                    throw new Error('found cyclic dependencies between ' + base.mixingIn);
                }
                base.mixingIn.push(mixin);
                mixin.call(base);
                base.mixingIn.pop();
                base.mixedIn.push(mixin);
            }
            setPropertyWritability(base, true);
            return base;
        };
        return {
            mixin: mixin,
            unlockProperty: unlockProperty
        };
    });
}.call(this));
(function () {
    define('build/js/advice', ['./compose'], function (compose) {
        'use strict';
        var advice;
        advice = {
            around: function (base, wrapped) {
                return function () {
                    var args, el, i, l, _i, _len;
                    l = arguments.length;
                    args = new Array(l + 1);
                    args[0] = base.bind(this);
                    for (i = _i = 0, _len = args.length; _i < _len; i = ++_i) {
                        el = args[i];
                        args[i + 1] = arguments[i];
                    }
                    return wrapped.apply(this, args);
                };
            },
            before: function (base, before) {
                var beforeFn;
                beforeFn = typeof before === 'function' ? before : before.obj[before.fnName];
                return function () {
                    beforeFn.apply(this, arguments);
                    return base.apply(this, arguments);
                };
            },
            after: function (base, after) {
                var afterFn;
                afterFn = typeof after === 'function' ? after : after.obj[after.fnName];
                return function () {
                    var res;
                    res = (base.unbound || base).apply(this, arguments);
                    afterFn.apply(this, arguments);
                    return res;
                };
            },
            withAdvice: function () {
                return [
                    'before',
                    'after',
                    'around'
                ].forEach(function (m) {
                    return this[m] = function (method, fn) {
                        return compose.unlockProperty(this, method, function () {
                            if (typeof this[method] === 'function') {
                                this[method] = advice[m](this[method], fn);
                            } else {
                                this[method] = fn;
                            }
                            return this[method];
                        });
                    };
                }, this);
            }
        };
        return advice;
    });
}.call(this));
(function () {
    define('build/js/event', ['./utils'], function (utils) {
        'use strict';
        var Event, eventSplitter, eventsApi, implementation, listenMethods, method, slice, triggerEvents;
        slice = [].slice;
        Event = {
            withEvent: function () {
                var method, _i, _len, _ref, _results;
                _ref = [
                    'on',
                    'off',
                    'once',
                    'trigger'
                ];
                _results = [];
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    method = _ref[_i];
                    _results.push(this[method] = Event[method]);
                }
                return _results;
            },
            on: function (name, callback, context) {
                var events;
                if (!eventsApi(this, 'on', name, [
                        callback,
                        context
                    ]) || !callback) {
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
            once: function (name, callback, context) {
                var once, self;
                if (!eventsApi(this, 'once', name, [
                        callback,
                        context
                    ]) || !callback) {
                    return this;
                }
                self = this;
                once = utils.once(function () {
                    self.off(name, once);
                    return callback.apply(this, arguments);
                });
                once._callback = callback;
                return this.on(name, once, context);
            },
            off: function (name, callback, context) {
                var ev, events, i, j, names, retain, _i, _j, _len, _len1;
                if (!this._events || !eventsApi(this, 'off', name, [
                        callback,
                        context
                    ])) {
                    return this;
                }
                if (!name && !callback && !context) {
                    this._events = void 0;
                    return this;
                }
                names = name ? [name] : Object.keys(this._events);
                for (i = _i = 0, _len = names.length; _i < _len; i = ++_i) {
                    name = names[i];
                    if (events = this._events[name]) {
                        this._events[name] = retain = [];
                        if (callback || context) {
                            for (j = _j = 0, _len1 = events.length; _j < _len1; j = ++_j) {
                                ev = events[j];
                                if (callback && callback !== ev.callback && callback !== ev.callback._callback || context && context !== ev.context) {
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
            trigger: function (name) {
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
                args.push({
                    target: this,
                    name: name
                });
                if (events) {
                    triggerEvents(events, args);
                }
                if (allEvents) {
                    triggerEvents(allEvents, args);
                }
                return this;
            },
            stopListening: function (obj, name, callback) {
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
        eventsApi = function (obj, action, name, rest) {
            var key, names, val, _i, _len;
            if (!name) {
                return true;
            }
            if (typeof name === 'object') {
                for (key in name) {
                    val = name[key];
                    obj[action].apply(obj, [
                        key,
                        val
                    ].concat(rest));
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
        triggerEvents = function (events, args) {
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
            Event[method] = function (obj, name, callback) {
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
}.call(this));
(function () {
    var __hasProp = {}.hasOwnProperty;
    define('build/js/property', [
        './utils',
        './compose',
        './event'
    ], function (utils, compose, event) {
        'use strict';
        var get, set;
        set = function (key, val) {
            var after, attrs, before, _ref, _ref1;
            if (!key) {
                return this;
            }
            if (arguments.length > 1 && typeof arguments[0] === 'string') {
                attrs = {};
                attrs[key] = val;
                return this.set(attrs);
            }
            this.attrs || (this.attrs = {});
            attrs = key;
            after = {};
            before = {};
            _ref = this.attrs;
            for (key in _ref) {
                if (!__hasProp.call(_ref, key))
                    continue;
                val = _ref[key];
                before[key] = val;
            }
            utils.push(this.attrs, attrs);
            _ref1 = this.attrs;
            for (key in _ref1) {
                if (!__hasProp.call(_ref1, key))
                    continue;
                val = _ref1[key];
                if (val !== before[key]) {
                    after[key] = val;
                } else {
                    delete before[key];
                }
            }
            if (Object.keys(after).length !== 0) {
                this.trigger('change', this, before, after);
            }
            return this;
        };
        get = function (attr) {
            return this.attrs && this.attrs[attr];
        };
        return function () {
            compose.mixin(this, event.withEvent);
            this.set = set;
            return this.get = get;
        };
    });
}.call(this));
(function () {
    var __hasProp = {}.hasOwnProperty;
    define('build/js/lifecycle', [
        './compose',
        './property'
    ], function (compose, withProperty) {
        'use strict';
        var despose, initialize;
        initialize = function (attrs) {
            var cloned, key, val, _ref;
            attrs || (attrs = {});
            cloned = {};
            for (key in attrs) {
                if (!__hasProp.call(attrs, key))
                    continue;
                val = attrs[key];
                cloned[key] = val;
            }
            _ref = this.defaults;
            for (key in _ref) {
                if (!__hasProp.call(_ref, key))
                    continue;
                val = _ref[key];
                if (!cloned.hasOwnProperty(key)) {
                    cloned[key] = val;
                }
            }
            this.set(cloned);
            return this;
        };
        despose = function () {
        };
        return function () {
            compose.mixin(this, withProperty);
            this.initialize = initialize;
            return this.despose = despose;
        };
    });
}.call(this));
(function () {
    define('build/js/serialize', [
        './compose',
        './property'
    ], function (compose, withProperty) {
        'use strict';
        var deserialize, serialize;
        serialize = function () {
            return [
                'type: ' + this.name,
                'id: ' + this.id,
                'props: ' + JSON.stringify(this.attrs)
            ].join(',');
        };
        deserialize = function () {
        };
        return function () {
            compose.mixin(this, withProperty);
            if (!this.serialize) {
                this.serialize = serialize;
            }
            if (!this.deserialize) {
                return this.deserialize = deserialize;
            }
        };
    });
}.call(this));
(function () {
    var __hasProp = {}.hasOwnProperty;
    define('build/js/collection', [], function () {
        'use strict';
        var collection, list, stack;
        list = {
            insertAt: function (index, item) {
                if (!this.__collection__) {
                    return this;
                }
                index = this.__collection__.indexOf(item);
                if (this.__collection__.indexOf(item) === -1) {
                    this.__collection__.splice(index, 0, item);
                }
                return this;
            },
            append: function (item) {
                this.__collection__ || (this.__collection__ = []);
                if (this.__collection__.indexOf(item) === -1) {
                    this.__collection__.push(item);
                }
                return this;
            },
            prepend: function (item) {
                this.__collection__ || (this.__collection__ = []);
                if (this.__collection__.indexOf(item) === -1) {
                    this.__collection__.unshift(item);
                }
                return this;
            },
            remove: function (item) {
                var idx;
                if (!this.__collection__) {
                    return this;
                }
                idx = this.__collection__.indexOf(item);
                if (idx > -1) {
                    this.__collection__.splice(idx, 1);
                }
                return this;
            },
            get: function (index) {
                if (this.__collection__) {
                    return this.__collection__[index];
                }
            },
            forEach: function (fn, context) {
                if (!this.__collection__) {
                    return this;
                }
                return this.__collection__.forEach(fn, context);
            },
            indexOf: function (item) {
                return (this.__collection__ || []).indexOf(item);
            },
            size: function () {
                return (this.__collection__ || []).length;
            },
            clear: function () {
                return this.__collection__ = [];
            }
        };
        stack = {
            push: function (item) {
                throw new Error('Not Implemented Yet');
            },
            pop: function () {
                throw new Error('Not Implemented Yet');
            }
        };
        collection = {
            withList: function () {
                var k, v, _results;
                _results = [];
                for (k in list) {
                    if (!__hasProp.call(list, k))
                        continue;
                    v = list[k];
                    _results.push(this[k] = v);
                }
                return _results;
            },
            withStack: function () {
                var k, v, _results;
                _results = [];
                for (k in stack) {
                    if (!__hasProp.call(stack, k))
                        continue;
                    v = stack[k];
                    _results.push(this[k] = v);
                }
                return _results;
            }
        };
        return collection;
    });
}.call(this));
(function () {
    var __hasProp = {}.hasOwnProperty, __extends = function (child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key))
                    child[key] = parent[key];
            }
            function ctor() {
                this.constructor = child;
            }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        };
    define('build/js/dou', [
        './compose',
        './advice',
        './lifecycle',
        './property',
        './serialize',
        './event',
        './utils',
        './collection'
    ], function (compose, advice, lifecycle, property, serialize, event, utils, collection) {
        'use strict';
        var define, mixin;
        define = function (options, constructor, prototype) {
            var Component, name, value, _ref;
            constructor || (constructor = function () {
            });
            if (options['extends']) {
                Component = function (_super) {
                    var _class;
                    __extends(Component, _super);
                    function Component() {
                        return _class.apply(this, arguments);
                    }
                    _class = constructor;
                    return Component;
                }(options['extends']);
            } else {
                Component = function () {
                    var _class;
                    function Component() {
                        return _class.apply(this, arguments);
                    }
                    _class = constructor;
                    return Component;
                }();
            }
            if (options.members) {
                _ref = options.members;
                for (name in _ref) {
                    if (!__hasProp.call(_ref, name))
                        continue;
                    value = _ref[name];
                    Component.prototype[name] = value;
                }
            }
            if (prototype) {
                for (name in prototype) {
                    if (!__hasProp.call(prototype, name))
                        continue;
                    value = prototype[name];
                    Component.prototype[name] = value;
                }
            }
            if (options.mixins) {
                compose.mixin(Component.prototype, options.mixins);
            }
            if (options.name) {
                Component.name = options.name;
            }
            return Component;
        };
        mixin = function (target, withs) {
            compose.mixin(typeof target === 'function' ? target.prototype : target, withs);
            return target;
        };
        return {
            define: define,
            mixin: mixin,
            'with': {
                advice: advice.withAdvice,
                property: property,
                lifecycle: lifecycle,
                event: event.withEvent,
                serialize: serialize,
                collection: collection
            },
            util: utils
        };
    });
}.call(this));

  context.dou = require('build/js/dou');
}(this));