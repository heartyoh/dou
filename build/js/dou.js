(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['./compose', './advice', './lifecycle', './property', './serialize', './event', './utils', './collection', './disposer'], function(compose, advice, lifecycle, property, serialize, event, utils, collection, disposer) {
    "use strict";
    var define, mixin;
    define = function(options, constructor, prototype) {
      var Component, name, value, _ref;
      constructor || (constructor = function() {});
      if (options["extends"]) {
        Component = (function(_super) {
          var _class;

          __extends(Component, _super);

          function Component() {
            return _class.apply(this, arguments);
          }

          _class = constructor;

          return Component;

        })(options["extends"]);
      } else {
        Component = (function() {
          var _class;

          function Component() {
            return _class.apply(this, arguments);
          }

          _class = constructor;

          return Component;

        })();
      }
      if (options.members) {
        _ref = options.members;
        for (name in _ref) {
          if (!__hasProp.call(_ref, name)) continue;
          value = _ref[name];
          Component.prototype[name] = value;
        }
      }
      if (prototype) {
        for (name in prototype) {
          if (!__hasProp.call(prototype, name)) continue;
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
    mixin = function(target, withs) {
      compose.mixin((typeof target === 'function' ? target.prototype : target), withs);
      return target;
    };
    return {
      define: define,
      mixin: mixin,
      "with": {
        advice: advice.withAdvice,
        property: property,
        disposer: disposer,
        lifecycle: lifecycle,
        event: event.withEvent,
        serialize: serialize,
        collection: collection
      },
      util: utils
    };
  });

}).call(this);
