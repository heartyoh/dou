(function() {
  define(['./compose', './property'], function(compose, withProperty) {
    "use strict";
    return function() {
      compose.mixin(this, withProperty);
      this.serialize = function() {
        return ["type: " + this.name, "id: " + this.id, "props: " + (JSON.stringify(this.attrs))].join(',');
      };
      return this.deserialize = function() {};
    };
  });

}).call(this);
