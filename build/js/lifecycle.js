(function() {
  var __hasProp = {}.hasOwnProperty;

  define(['./compose', './property'], function(compose, withProperty) {
    "use strict";
    var despose, initialize;
    initialize = function(attrs) {
      var cloned, key, val, _ref;
      attrs || (attrs = {});
      cloned = {};
      for (key in attrs) {
        if (!__hasProp.call(attrs, key)) continue;
        val = attrs[key];
        cloned[key] = val;
      }
      _ref = this.defaults;
      for (key in _ref) {
        if (!__hasProp.call(_ref, key)) continue;
        val = _ref[key];
        if (!cloned.hasOwnProperty(key)) {
          cloned[key] = val;
        }
      }
      this.set(cloned);
      return this;
    };
    despose = function() {};
    return function() {
      compose.mixin(this, withProperty);
      this.initialize = initialize;
      return this.despose = despose;
    };
  });

}).call(this);
