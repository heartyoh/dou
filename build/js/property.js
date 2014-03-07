(function() {
  var __hasProp = {}.hasOwnProperty;

  define(['./utils', './compose', './event'], function(utils, compose, event) {
    "use strict";
    var get, getAll, set;
    set = function(key, val) {
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
        if (!__hasProp.call(_ref, key)) continue;
        val = _ref[key];
        before[key] = val;
      }
      utils.push(this.attrs, attrs);
      _ref1 = this.attrs;
      for (key in _ref1) {
        if (!__hasProp.call(_ref1, key)) continue;
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
    get = function(attr) {
      if (this.attrs) {
        return this.attrs[attr];
      } else {
        return void 0;
      }
    };
    getAll = function() {
      if (this.attrs) {
        return utils.clone(this.attrs);
      } else {
        return {};
      }
    };
    return function() {
      compose.mixin(this, event.withEvent);
      this.set = set;
      this.get = get;
      return this.getAll = getAll;
    };
  });

}).call(this);
