(function() {
  var __hasProp = {}.hasOwnProperty;

  define([], function() {
    "use strict";
    var ALL, byName, byNameContains, byType, byValue, byValueCoerced, custom, defaultActionsFilter, defaultEventNamesFilter, filterEventLogsByAction, filterEventLogsByName, global, hideAllEventLogs, logFilter, retrieveLogFilter, saveLogFilter, search, showAllEventLogs, tests, traverse;
    global = window || {};
    traverse = function(comparator, clue, options) {
      var obj, path, prop, _results;
      options = options || {};
      obj = options.obj || global;
      path = options.path || (obj === global ? 'global' : '');
      _results = [];
      for (prop in obj) {
        if (!__hasProp.call(obj, prop)) continue;
        if ((tests[comparator] || comparator)(clue, obj, prop)) {
          console.log("" + path + "." + prop + " -> (" + (typeof obj[prop]) + ")", obj[prop]);
        }
        if (obj[prop] && typeof obj[prop] === 'object' && obj[prop] !== obj) {
          _results.push(traverse(comparator, clue, {
            obj: obj[prop],
            path: "" + path + "." + prop
          }));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };
    search = function(comparator, expected, clue, options) {
      if (!expected || typeof clue === expected) {
        return traverse(comparator, clue, options);
      } else {
        return console.error("" + clue + " must be " + expected);
      }
    };
    tests = {
      name: function(clue, obj, prop) {
        return clue === prop;
      },
      nameContains: function(clue, obj, prop) {
        return prop.indexOf(clue) > -1;
      },
      type: function(clue, obj, prop) {
        return obj[prop] instanceof clue;
      },
      value: function(clue, obj, prop) {
        return obj[prop] === clue;
      },
      valueCoerced: function(clue, obj, prop) {
        return obj[prop] == clue;
      }
    };
    byName = function(clue, options) {
      return search('name', 'string', clue, options);
    };
    byNameContains = function(clue, options) {
      return search('nameContains', 'string', clue, options);
    };
    byType = function(clue, options) {
      return search('type', 'function', clue, options);
    };
    byValue = function(clue, options) {
      return search('value', null, clue, options);
    };
    byValueCoerced = function(clue, options) {
      return search('valueCoerced', null, clue, options);
    };
    custom = function(comparator, options) {
      return traverse(comparator, null, options);
    };
    filterEventLogsByAction = function() {
      var actions;
      actions = [].slice.call(arguments);
      logFilter.eventNames.length || (logFilter.eventNames = ALL);
      logFilter.actions = actions.length ? actions : ALL;
      return saveLogFilter();
    };
    filterEventLogsByName = function() {
      var eventNames;
      eventNames = [].slice.call(arguments);
      logFilter.actions.length || (logFilter.actions = ALL);
      logFilter.eventNames = eventNames.length ? eventNames : ALL;
      return saveLogFilter();
    };
    hideAllEventLogs = function() {
      logFilter.actions = [];
      logFilter.eventNames = [];
      return saveLogFilter();
    };
    showAllEventLogs = function() {
      logFilter.actions = ALL;
      logFilter.eventNames = ALL;
      return saveLogFilter();
    };
    saveLogFilter = function() {
      if (global.localStorage) {
        global.localStorage.setItem('logFilter_eventNames', logFilter.eventNames);
        return global.localStorage.setItem('logFilter_actions', logFilter.actions);
      }
    };
    retrieveLogFilter = function() {
      var key, result, value;
      result = {
        eventNames: (global.localStorage && global.localStorage.getItem('logFilter_eventNames')) || defaultEventNamesFilter,
        actions: (global.localStorage && global.localStorage.getItem('logFilter_actions')) || defaultActionsFilter
      };
      for (key in result) {
        if (!__hasProp.call(result, key)) continue;
        value = result[key];
        if (typeof value === 'string' && value !== ALL) {
          result[key] = value.split('.');
        }
      }
      return result;
    };
    ALL = 'all';
    defaultEventNamesFilter = [];
    defaultActionsFilter = [];
    logFilter = retrieveLogFilter();
    return {
      enable: function(enable) {
        this.enabled = !!enable;
        if (enable && global.console) {
          console.info('Booting in DEBUG mode');
          console.info('You can configure event logging with DEBUG.events.logAll()/logNone()/logByName()/logByAction()');
        }
        return global.DEBUG = this;
      },
      find: {
        byName: byName,
        byNameContains: byNameContains,
        byType: byType,
        byValue: byValue,
        byValueCoerced: byValueCoerced,
        custom: custom
      },
      events: {
        logFilter: logFilter,
        logByAction: filterEventLogsByAction,
        logByName: filterEventLogsByName,
        logAll: showAllEventLogs,
        logNone: hideAllEventLogs
      }
    };
  });

}).call(this);
