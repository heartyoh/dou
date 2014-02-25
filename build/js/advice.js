(function() {
  define(['./compose'], function(compose) {
    "use strict";
    var advice;
    advice = {
      around: function(base, wrapped) {
        return function() {
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
      before: function(base, before) {
        var beforeFn;
        beforeFn = typeof before === 'function' ? before : before.obj[before.fnName];
        return function() {
          beforeFn.apply(this, arguments);
          return base.apply(this, arguments);
        };
      },
      after: function(base, after) {
        var afterFn;
        afterFn = (typeof after === 'function' ? after : after.obj[after.fnName]);
        return function() {
          var res;
          res = (base.unbound || base).apply(this, arguments);
          afterFn.apply(this, arguments);
          return res;
        };
      },
      withAdvice: function() {
        return ['before', 'after', 'around'].forEach(function(m) {
          return this[m] = function(method, fn) {
            return compose.unlockProperty(this, method, function() {
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

}).call(this);
