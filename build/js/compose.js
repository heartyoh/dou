(function() {
  var __hasProp = {}.hasOwnProperty;

  define(['./utils', './debug'], function(utils, debug) {
    "use strict";
    var canWriteProtect, dontLock, e, mixin, setPropertyWritability, unlockProperty;
    canWriteProtect = debug.enabled && !utils.isEnumerable(Object, 'getOwnPropertyDescriptor');
    dontLock = ['mixedIn', 'mixingIn'];
    if (canWriteProtect) {
      try {
        Object.getOwnPropertyDescriptor(Object, 'keys');
      } catch (_error) {
        e = _error;
        canWriteProtect = false;
      }
    }
    setPropertyWritability = function(obj, isWritable) {
      var desc, key, props;
      if (!canWriteProtect) {
        return;
      }
      props = Object.create(null);
      for (key in obj) {
        if (!__hasProp.call(obj, key)) continue;
        if (dontLock.indexOf(key < 0)) {
          desc = Object.getOwnPropertyDescriptor(obj, key);
          desc.writable = isWritable;
          props[key] = desc;
        }
      }
      return Object.defineProperties(obj, props);
    };
    unlockProperty = function(obj, prop, op) {
      var writable;
      if (!canWriteProtect || !obj.hasOwnProperty(prop)) {
        return op.call(obj);
      }
      writable = Object.getOwnPropertyDescriptor(obj, prop).writable;
      Object.defineProperties(obj, prop, {
        writable: true
      });
      op.call(obj);
      return Object.defineProperties(obj, prop, {
        writable: writable
      });
    };
    mixin = function(base, mixins) {
      var _i, _len;
      if (!(mixins instanceof Array)) {
        return this.mixin(base, [mixins]);
      }
      base.mixedIn = base.hasOwnProperty('mixedIn') ? base.mixedIn : [];
      base.mixingIn = base.hasOwnProperty('mixingIn') ? base.mixingIn : [];
      setPropertyWritability(base, false);
      for (_i = 0, _len = mixins.length; _i < _len; _i++) {
        mixin = mixins[_i];
        if (!(base.mixedIn.indexOf(mixin) === -1)) {
          continue;
        }
        if (base.mixingIn.indexOf(mixin) > -1) {
          throw new Error('found cyclic dependencies between ' + base.mixingIn);
        }
        base.mixingIn.push(mixin);
        mixin.call(base);
        base.mixingIn.pop();
        base.mixedIn.push(mixin);
      }
      return setPropertyWritability(base, true);
    };
    return {
      mixin: mixin,
      unlockProperty: unlockProperty
    };
  });

}).call(this);
