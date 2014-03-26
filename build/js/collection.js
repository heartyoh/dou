(function() {
  var __hasProp = {}.hasOwnProperty;

  define([], function() {
    "use strict";
    var List, Stack, collection, list, stack;
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
      getAt: function(index) {
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
      },
      moveForward: function(item) {
        var index;
        index = this.indexOf(item);
        if (index === -1 || index === 0) {
          return;
        }
        this.__collection__[index] = this.__collection__[index - 1];
        return this.__collection__[index - 1] = item;
      },
      moveBackward: function(item) {
        var index;
        index = this.indexOf(item);
        if ((index === -1) || (index === this.size() - 1)) {
          return;
        }
        this.__collection__[index] = this.__collection__[index + 1];
        return this.__collection__[index + 1] = item;
      },
      moveToHead: function(item) {
        var head, index, tail;
        index = this.indexOf(item);
        if (index === -1 || index === 0) {
          return;
        }
        head = this.__collection__.splice(0, index);
        tail = this.__collection__.splice(1);
        return this.__collection__ = this.__collection__.concat(head, tail);
      },
      moveToTail: function(item) {
        var head, index, tail;
        index = this.indexOf(item);
        if (index === -1 || (index === this.size() - 1)) {
          return;
        }
        head = this.__collection__.splice(0, index);
        tail = this.__collection__.splice(1);
        return this.__collection__ = head.concat(tail, this.__collection__);
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
    List = function() {};
    List.prototype = list;
    Stack = function() {};
    Stack.prototype = stack;
    collection = {
      List: List,
      Stack: Stack,
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
