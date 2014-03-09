(function() {
  var __slice = [].slice,
    __hasProp = {}.hasOwnProperty;

  define([], function() {
    "use strict";
    var DEFAULT_INTERVAL, idCounter;
    DEFAULT_INTERVAL = 100;
    idCounter = 0;
    return {
      merge: function() {
        var extenders, key, other, target, val, _i, _len;
        target = arguments[0], extenders = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        if (!target || typeof target === !"object") {
          target = {};
        }
        for (_i = 0, _len = extenders.length; _i < _len; _i++) {
          other = extenders[_i];
          for (key in other) {
            if (!__hasProp.call(other, key)) continue;
            val = other[key];
            if (typeof val !== "object") {
              target[key] = val;
            } else {
              target[key] = this.merge(target[key], val);
            }
          }
        }
        return target;
      },
      shallow_merge: function() {
        var extender, extenders, key, result, val, _i, _len;
        extenders = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        result = {};
        for (_i = 0, _len = extenders.length; _i < _len; _i++) {
          extender = extenders[_i];
          for (key in extender) {
            if (!__hasProp.call(extender, key)) continue;
            val = extender[key];
            result[key] = val;
          }
        }
        return result;
      },
      push: function(base, extra, protect) {
        var key, val;
        if (!base || !extra) {
          return base;
        }
        for (key in extra) {
          if (!__hasProp.call(extra, key)) continue;
          val = extra[key];
          if (base[key] && protect) {
            throw new Error("utils.push attempted to overwrite \"" + key + "\" while running in protected mode");
          }
          if (typeof base[key] === "object" && typeof extra[key] === "object") {
            this.push(base[key], extra[key]);
          } else {
            base[key] = extra[key];
          }
        }
        return base;
      },
      isEnumerable: function(obj, property) {
        return Object.keys(obj).indexOf(property) > -1;
      },
      compose: function() {
        var funcs;
        funcs = arguments;
        return function() {
          var args, i, _i, _ref;
          args = arguments;
          for (i = _i = _ref = funcs.length - 1; _ref <= 0 ? _i <= 0 : _i >= 0; i = _ref <= 0 ? ++_i : --_i) {
            args = funcs[i].apply(this, args);
          }
          return args[0];
        };
      },
      uniqueArray: function(array) {
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
      debounce: function(func, wait, immediate) {
        var result, timeout;
        if (typeof wait !== 'number') {
          wait = DEFAULT_INTERVAL;
        }
        timeout = 0;
        result = null;
        return function() {
          var args, callNow, context, later;
          context = this;
          args = arguments;
          later = function() {
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
      throttle: function(func, wait) {
        var args, context, more, result, throttling, timeout, whenDone;
        if (typeof wait !== 'number') {
          wait = DEFAULT_INTERVAL;
        }
        context = args = timeout = throttling = more = result = null;
        whenDone = this.debounce(function() {
          return more = throttling = false;
        }, wait);
        return function() {
          var later;
          context = this;
          args = arguments;
          later = function() {
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
      countThen: function(num, base) {
        return function() {
          if (!--num) {
            return base.apply(this, arguments);
          }
        };
      },
      delegate: function(rules) {
        return function(e, data) {
          var parent, selector, target;
          target = $(e.target);
          parent = null;
          for (selector in rules) {
            if (!__hasProp.call(rules, selector)) continue;
            if (!e.isPropagationStopped() && (parent = target.closest(selector)).length) {
              data = data || {};
              data.el = parent[0];
              return rules[selector].apply(this, [e, data]);
            }
          }
        };
      },
      once: function(func) {
        var ran, result;
        ran = false;
        result = null;
        return function() {
          if (ran) {
            return result;
          }
          result = func.apply(this, arguments);
          ran = true;
          return result;
        };
      },
      uniqueId: function(prefix) {
        var id;
        id = (++idCounter) + '';
        if (prefix) {
          return prefix + id;
        } else {
          return id;
        }
      },
      clone: function(obj) {
        if ((obj == null) || typeof obj !== 'object') {
          return obj;
        }
        if (obj instanceof Array) {
          return obj.slice();
        }
        return this.shallow_merge(obj);
      }
    };
  });

}).call(this);
