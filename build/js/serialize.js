(function() {
  define(['./compose', './property'], function(compose, withProperty) {
    "use strict";
    var deserialize, serialize;
    serialize = function() {
      return ["type: " + this.name, "id: " + this.id, "props: " + (JSON.stringify(this.attrs))].join(',');
    };
    deserialize = function() {};
    return function() {
      compose.mixin(this, withProperty);
      if (!this.serialize) {
        this.serialize = serialize;
      }
      if (!this.deserialize) {
        return this.deserialize = deserialize;
      }
    };
  });

}).call(this);
