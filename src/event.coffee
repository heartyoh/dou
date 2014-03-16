# ==========================================
# Copyright 2014 Hatio, Lab.
# Licensed under The MIT License
# http://opensource.org/licenses/MIT
# ==========================================

define [
    './utils'
    './collection'
], (utils, collection) ->

    "use strict"

    Event =
        withEvent: ->
            (this[method] = Event[method]) for method in ['on', 'off', 'once', 'delegate_on', 'delegate_off', 'trigger']

        on: (name, callback, context) ->
            return this if (!eventsApi(this, 'on', name, [callback, context]) || !callback)

            this._listeners || (this._listeners = {});
            events = this._listeners[name] || (this._listeners[name] = []);
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
            return this if (!this._listeners || !eventsApi(this, 'off', name, [callback, context]))

            if (!name && !callback && !context)
                this._listeners = undefined;
                return this;

            names = if name then [name] else Object.keys(this._listeners);

            for name, i in names
                if (events = this._listeners[name])
                    this._listeners[name] = retain = []
                    if (callback || context)
                        for ev, j in events
                            if ((callback && callback isnt ev.callback && callback isnt ev.callback._callback) || (context && context isnt ev.context))
                                retain.push ev

                    delete this._listeners[name] if (!retain.length)

            this

        delegate_on: (delegator) ->
            this._delegators || (this._delegators = new collection.List());
            this._delegators.append delegator

            this

        delegate_off: (delegator) ->
            return this if not this._delegators
            this._delegators.remove delegator

            this

        delegate: ->
            delegateEvents(this._delegators, arguments) if this._delegators and this._delegators.size() > 0

            return this if (!this._listeners)

            event = arguments[arguments.length - 1]
            event.delegator = this
            
            listeners = this._listeners[event.name]
            listeners_for_all = this._listeners.all

            triggerEvents(listeners, arguments) if (listeners)
            triggerEvents(listeners_for_all, arguments) if (listeners_for_all)
            
            this

        # Trigger one or many events, firing all bound callbacks. Callbacks are
        # passed the same arguments as `trigger` is, apart from the event name
        # (unless you're listening on `"all"`, which will cause your callback to
        # receive the true name of the event as the first argument).
        trigger: (name) ->
            args = [].slice.call(arguments, 1)

            args.push({
                target: this,
                name: name
            });

            delegateEvents(this._delegators, args) if this._delegators and this._delegators.size() > 0
            
            return this if not this._listeners

            return this if (!eventsApi(this, 'trigger', name, args))

            listeners = this._listeners[name]
            listeners_for_all = this._listeners.all

            triggerEvents(listeners, args) if (listeners)
            triggerEvents(listeners_for_all, args) if (listeners_for_all)
            
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

    triggerEvents = (listeners, args) ->
        ev.callback.apply(ev.ctx, args) for ev in listeners

    delegateEvents = (delegators, args) ->
        delegators.forEach (delegator) ->
            Event.delegate.apply(delegator, args)

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
