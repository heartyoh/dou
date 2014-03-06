# ==========================================
# Copyright 2014 Hatio, Lab.
# Licensed under The MIT License
# http://opensource.org/licenses/MIT
# ==========================================

define [
    './utils'
], (utils) ->

    "use strict"

    slice = [].slice

    Event =
        withEvent: ->
            (this[method] = Event[method]) for method in ['on', 'off', 'once', 'trigger', 'delegate']

        on: (name, callback, context) ->
            return this if (!eventsApi(this, 'on', name, [callback, context]) || !callback)

            this._events || (this._events = {});
            events = this._events[name] || (this._events[name] = []);
            events.push
                callback: callback
                context: context
                ctx: context || this
            this

        # Bind an event to only be triggered a single time. After the first time
        # the callback is invoked, it will be removed.
        once: (name, callback, context) ->
            return this if (!eventsApi(this, 'once', name, [callback, context]) || !callback)
            
            self = this
            
            once = utils.once ->
                self.off name, once
                callback.apply this, arguments

            once._callback = callback
            
            this.on name, once, context

        # Remove one or many callbacks. If `context` is null, removes all
        # callbacks with that function. If `callback` is null, removes all
        # callbacks for the event. If `name` is null, removes all bound
        # callbacks for all events.
        off: (name, callback, context) ->
            return this if (!this._events || !eventsApi(this, 'off', name, [callback, context]))

            if (!name && !callback && !context)
                this._events = undefined;
                return this;

            names = if name then [name] else Object.keys(this._events);

            for name, i in names
                if (events = this._events[name])
                    this._events[name] = retain = []
                    if (callback || context)
                        for ev, j in events
                            if ((callback && callback isnt ev.callback && callback isnt ev.callback._callback) || (context && context isnt ev.context))
                                retain.push ev

                    delete this._events[name] if (!retain.length)

            this

        delegate: ->
            return this if (!this._events)

            event = arguments[arguments.length - 1]
            
            events = this._events[event.name]
            allEvents = this._events.all

            triggerEvents(events, arguments) if (events)
            triggerEvents(allEvents, arguments) if (allEvents)
            
            this

        # Trigger one or many events, firing all bound callbacks. Callbacks are
        # passed the same arguments as `trigger` is, apart from the event name
        # (unless you're listening on `"all"`, which will cause your callback to
        # receive the true name of the event as the first argument).
        trigger: (name) ->
            return this if (!this._events)

            args = slice.call(arguments, 1)

            return this if (!eventsApi(this, 'trigger', name, args))

            events = this._events[name]
            allEvents = this._events.all

            args.push({
                target: this,
                name: name
            });
            
            triggerEvents(events, args) if (events)
            triggerEvents(allEvents, args) if (allEvents)
            
            this

        # Tell this object to stop listening to either specific events ... or
        # to every object it's currently listening to.
        stopListening: (obj, name, callback) ->
            listeningTo = this._listeningTo
            
            return this if (!listeningTo)

            remove = !name && !callback;
            
            callback = this if (!callback && typeof name is 'object')

            (listeningTo = {})[obj._listenId] = obj if (obj)

            for id, obj of listeningTo
                obj.off(name, callback, this)
                delete this._listeningTo[id] if (remove || _.isEmpty(obj._events)) 

            this

    # Regular expression used to split event strings.
    eventSplitter = /\s+/

    # Implement fancy features of the Event API such as multiple event
    # names `"change blur"` and jQuery-style event maps `{change: action}`
    # in terms of the existing API.
    eventsApi = (obj, action, name, rest) ->
        return true if !name

        # Handle event maps.
        if typeof name is 'object'
            obj[action].apply(obj, [key, val].concat(rest)) for key, val of name
            return false;

        # Handle space separated event names.
        if eventSplitter.test(name)
            names = name.split(eventSplitter)

            obj[action].apply(obj, [val].concat(rest)) for val in names

            return false;

        true

    triggerEvents = (events, args) ->
        ev.callback.apply(ev.ctx, args) for ev in events

    listenMethods =
        listenTo: 'on'
        listenToOnce: 'once'

    # Inversion-of-control versions of `on` and `once`. Tell *this* object to
    # listen to an event in another object ... keeping track of what it's
    # listening to.
    for method, implementation of listenMethods
        Event[method] = (obj, name, callback) ->
            listeningTo = this._listeningTo || (this._listeningTo = {})
            id = obj._listenId || (obj._listenId = utils.uniqueId('l'))
            listeningTo[id] = obj
            callback = this if (!callback && typeof name is 'object')
            obj[implementation](name, callback, this)

            return this
    Event
