(function() {
  define(['./compose', './advice'], function(compose, advice) {
    "use strict";
    var addDisposer, dispose;
    addDisposer = function(callback) {
      if (!this.__disposers) {
        this.__disposers = [];
      }
      return this.__disposers.push(callback);
    };
    dispose = function() {
      var callback, _i, _len, _ref, _results;
      if (!this.__disposers) {
        return;
      }
      if (this.__disposers) {
        _ref = this.__disposers;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          callback = _ref[_i];
          _results.push(callback.call(this));
        }
        return _results;
      }
    };
    return function() {
      this.addDisposer = addDisposer;
      if (this.dispose) {
        compose.mixin(this, advice.withAdvice);
        return this.after('dispose', dispose);
      } else {
        return this.dispose = dispose;
      }
    };
  });

}).call(this);
