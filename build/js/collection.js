(function() {
  var __hasProp = {}.hasOwnProperty;

  define([], function() {
    "use strict";
    var collection, list, stack;
    list = {
      insertAt: function(index, item) {
        if (!this.__collection__) {
          return this;
        }
        index = this.__collection__.indexOf(item);
        if (this.__collection__.indexOf(item) === -1) {
          this.__collection__.splice(index, 0, item);
        }
        return this;
      },
      append: function(item) {
        this.__collection__ || (this.__collection__ = []);
        if (this.__collection__.indexOf(item) === -1) {
          this.__collection__.push(item);
        }
        return this;
      },
      prepend: function(item) {
        this.__collection__ || (this.__collection__ = []);
        if (this.__collection__.indexOf(item) === -1) {
          this.__collection__.unshift(item);
        }
        return this;
      },
      remove: function(item) {
        var idx;
        if (!this.__collection__) {
          return this;
        }
        idx = this.__collection__.indexOf(item);
        if (idx > -1) {
          this.__collection__.splice(idx, 1);
        }
        return this;
      },
      get: function(index) {
        if (this.__collection__) {
          return this.__collection__[index];
        }
      },
      forEach: function(fn, context) {
        if (!this.__collection__) {
          return this;
        }
        return this.__collection__.forEach(fn, context);
      },
      indexOf: function(item) {
        return (this.__collection__ || []).indexOf(item);
      },
      size: function() {
        return (this.__collection__ || []).length;
      },
      clear: function() {
        return this.__collection__ = [];
      }
    };
    stack = {
      push: function(item) {
        throw new Error('Not Implemented Yet');
      },
      pop: function() {
        throw new Error('Not Implemented Yet');
      }
    };
    collection = {
      withList: function() {
        var k, v, _results;
        _results = [];
        for (k in list) {
          if (!__hasProp.call(list, k)) continue;
          v = list[k];
          _results.push(this[k] = v);
        }
        return _results;
      },
      withStack: function() {
        var k, v, _results;
        _results = [];
        for (k in stack) {
          if (!__hasProp.call(stack, k)) continue;
          v = stack[k];
          _results.push(this[k] = v);
        }
        return _results;
      }
    };
    return collection;
  });

}).call(this);
