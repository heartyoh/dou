(function() {
  define(['./advice', './compose', './debug', './event', './lifecycle', './property', './serialize', './utils', './dou'], function(advice, compose, debug, event, lifecycle, property, serialize, utils, dou) {
    "use strict";
    return {
      advice: advice,
      compose: compose,
      debug: debug,
      event: event,
      lifecycle: lifecycle,
      property: property,
      serialize: serialize,
      utils: utils,
      dou: dou
    };
  });

}).call(this);
