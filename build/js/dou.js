(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['./compose', './advice', './lifecycle', './property', './serialize', './event'], function(compose, advice, lifecycle, property, serialize, event) {
    "use strict";
    var define, mixin;
    define = function(options) {
      var Component;
      if (options["extends"]) {
        Component = (function(_super) {
          __extends(Component, _super);

          function Component() {
            return Component.__super__.constructor.apply(this, arguments);
          }

          return Component;

        })(options["extends"]);
      } else {
        Component = (function() {
          function Component() {}

          return Component;

        })();
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
      return compose.mixin((typeof target === 'function' ? target.prototype : target), withs);
    };
    return {
      define: define,
      mixin: mixin,
      "with": {
        advice: advice.withAdvice,
        property: property,
        lifecycle: lifecycle,
        event: event.withEvent,
        serialize: serialize
      }
    };
  });

}).call(this);
