# ==========================================
# Copyright 2014 Hatio, Lab.
# Licensed under The MIT License
# http://opensource.org/licenses/MIT
# ==========================================

define [], ->
    
    "use strict"

    # ==========================================
    # Search object model
    # ==========================================
    global = window || {}

    traverse = (comparator, clue, options) ->
        options = options or {}
        obj = options.obj or global
        path = options.path or (if obj is global then 'global' else '')
        
        for own prop of obj
            if (tests[comparator] or comparator)(clue, obj, prop)
                console.log "#{path}.#{prop} -> (#{typeof obj[prop]})", obj[prop] 
            if obj[prop] and typeof obj[prop] is 'object' and obj[prop] isnt obj
                traverse comparator, clue, { obj: obj[prop], path: "#{path}.#{prop}" }

    search = (comparator, expected, clue, options) ->
        if !expected or typeof clue is expected
            traverse comparator, clue, options 
        else
            console.error "#{clue} must be #{expected}"

    tests =
        name: (clue, obj, prop) -> clue is prop
        nameContains: (clue, obj, prop) -> prop.indexOf(clue) > -1
        type: (clue, obj, prop) -> obj[prop] instanceof clue
        value: (clue, obj, prop) -> obj[prop] is clue
        valueCoerced: (clue, obj, prop) -> `obj[prop] == clue`

    byName = (clue, options) -> search('name', 'string', clue, options)
    byNameContains = (clue, options) -> search('nameContains', 'string', clue, options)
    byType = (clue, options) -> search('type', 'function', clue, options)
    byValue = (clue, options) -> search('value', null, clue, options)
    byValueCoerced = (clue, options) -> search('valueCoerced', null, clue, options)
    custom = (comparator, options) -> traverse(comparator, null, options)

    # ==========================================
    # Event logging
    # ==========================================

    filterEventLogsByAction = ->
        actions = [].slice.call(arguments)

        logFilter.eventNames.length || (logFilter.eventNames = ALL)
        logFilter.actions = if actions.length then actions else ALL
        saveLogFilter()

    filterEventLogsByName = ->
        eventNames = [].slice.call(arguments)

        logFilter.actions.length || (logFilter.actions = ALL)
        logFilter.eventNames = if eventNames.length then eventNames else ALL
        saveLogFilter()

    hideAllEventLogs = ->
        logFilter.actions = []
        logFilter.eventNames = []
        saveLogFilter()

    showAllEventLogs = ->
        logFilter.actions = ALL
        logFilter.eventNames = ALL
        saveLogFilter()

    saveLogFilter = ->
        if (global.localStorage)
            global.localStorage.setItem('logFilter_eventNames', logFilter.eventNames)
            global.localStorage.setItem('logFilter_actions', logFilter.actions)

    retrieveLogFilter = ->
        result =
            eventNames: (global.localStorage && global.localStorage.getItem('logFilter_eventNames')) || defaultEventNamesFilter
            actions: (global.localStorage && global.localStorage.getItem('logFilter_actions')) || defaultActionsFilter

        # reconstitute arrays
        result[key] = value.split('.') for own key, value of result when typeof value == 'string' and value isnt ALL

        result

    ALL = 'all'; # no filter

    # no logging by default
    defaultEventNamesFilter = []
    defaultActionsFilter = []

    logFilter = retrieveLogFilter()

    {
        enable: (enable) ->
            this.enabled = !! enable

            if (enable && global.console)
                console.info 'Booting in DEBUG mode'
                console.info 'You can configure event logging with DEBUG.events.logAll()/logNone()/logByName()/logByAction()'

            global.DEBUG = this

        find:
            byName: byName
            byNameContains: byNameContains
            byType: byType
            byValue: byValue
            byValueCoerced: byValueCoerced
            custom: custom

        events:
            logFilter: logFilter
            # Accepts any number of action args
            # e.g. DEBUG.events.logByAction("on", "off")
            logByAction: filterEventLogsByAction
            # Accepts any number of event name args (inc. regex or wildcards)
            # e.g. DEBUG.events.logByName(/ui.*/, "*Thread*");
            logByName: filterEventLogsByName
            logAll: showAllEventLogs,
            logNone: hideAllEventLogs
    }
