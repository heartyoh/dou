# ==========================================
# Copyright 2014 Hatio, Lab.
# Licensed under The MIT License
# http://opensource.org/licenses/MIT
# ==========================================

define [], ->
    
    "use strict"

    DEFAULT_INTERVAL = 100
    idCounter = 0

    {
        # returns new object representing multiple objects merged together
        # optional final argument is boolean which specifies if merge is recursive
        # original objects are unmodified
        #
        # usage:
        #   var base = {a:2, b:6};
        #   var extra = {b:3, c:4};
        #   merge(base, extra); //{a:2, b:3, c:4}
        #   base; //{a:2, b:6}
        #
        #   var base = {a:2, b:6};
        #   var extra = {b:3, c:4};
        #   var extraExtra = {a:4, d:9};
        #   merge(base, extra, extraExtra); //{a:4, b:3, c:4. d: 9}
        #   base; //{a:2, b:6}
        #
        #   var base = {a:2, b:{bb:4, cc:5}};
        #   var extra = {a:4, b:{cc:7, dd:1}};
        #   merge(base, extra, true); //{a:4, b:{bb:4, cc:7, dd:1}}
        #   base; //{a:4, b:{bb:4, cc:7, dd:1}}
        #
        merge: (target, extenders...) ->
            target = {} if not target or typeof target is not "object"

            for other in extenders
                for own key, val of other
                    if typeof val isnt "object"
                        target[key] = val
                    else
                        target[key] = this.merge target[key], val
 
            target

        # updates base in place by copying properties of extra to it
        # optionally clobber protected
        # usage:
        #   var base = {a:2, b:6};
        #   var extra = {c:4};
        #   push(base, extra); //{a:2, b:6, c:4}
        #   base; //{a:2, b:6, c:4}
        #
        #   var base = {a:2, b:6};
        #   var extra = {b: 4 c:4};
        #   push(base, extra, true); //Error ("utils.push attempted to overwrite 'b' while running in protected mode")
        #   base; //{a:2, b:6}
        #
        # objects with the same key will merge recursively when protect is false
        # eg:
        # var base = {a:16, b:{bb:4, cc:10}};
        # var extra = {b:{cc:25, dd:19}, c:5};
        # push(base, extra); //{a:16, {bb:4, cc:25, dd:19}, c:5}
        #
        push: (base, extra, protect) ->
            return base if not base or not extra
            for own key, val of extra
                throw new Error "utils.push attempted to overwrite \"#{key}\" while running in protected mode" if base[key] and protect

                if typeof base[key] is "object" and typeof extra[key] is "object"
                    this.push base[key], extra[key]
                else
                    base[key] = extra[key]

            base

        isEnumerable: (obj, property) -> Object.keys(obj).indexOf(property) > -1

        # build a function from other function(s)
        # utils.compose(a,b,c) -> a(b(c()));
        # implementation lifted from underscore.js (c) 2009-2012 Jeremy Ashkenas
        compose: ->
            funcs = arguments

            ->
                args = arguments
                args = funcs[i].apply(this, args) for i in [(funcs.length - 1) .. 0]
                args[0]

        # Can only unique arrays of homogeneous primitives, 
        # e.g. an array of only strings, an array of only booleans, or an array of only numerics
        uniqueArray: (array) ->
            u = {}
            a = []

            for item in array
                continue if u.hasOwnProperty(item)

                a.push(item);
                u[item] = 1

            a

        debounce: (func, wait, immediate) ->
            wait = DEFAULT_INTERVAL if typeof wait isnt 'number'
            
            timeout = 0
            result = null

            ->
                context = this
                args = arguments

                later = ->
                    timeout = null
                    result = func.apply(context, args) if !immediate

                callNow = immediate and !timeout
                clearTimeout timeout
                timeout = setTimeout later, wait

                result = func.apply context, args if callNow

                result

        throttle: (func, wait) ->
            wait = DEFAULT_INTERVAL if typeof wait isnt 'number'

            context = args = timeout = throttling = more = result = null

            whenDone = this.debounce ->
                more = throttling = false
            , wait

            ->
                context = this
                args = arguments

                later = ->
                    timeout = null
                    result = func.apply context, args if more
                    whenDone()

                timeout = setTimeout later, wait if !timeout
                if throttling
                    more = true
                else
                    throttling = true
                    result = func.apply context, args

                whenDone()
                result

        countThen: (num, base) ->
            -> base.apply this, arguments if !--num

        delegate: (rules) ->
            (e, data) ->
                target = $(e.target)
                parent = null

                for own selector of rules
                    if !e.isPropagationStopped() and (parent = target.closest(selector)).length
                        data = data || {}
                        data.el = parent[0]
                        return rules[selector].apply this, [e, data]

        # ensures that a function will only be called once.
        # usage:
        # will only create the application once
        #   var initialize = utils.once(createApplication)
        #     initialize();
        #     initialize();
        #
        # will only delete a record once
        #   var myHanlder = function () {
        #     $.ajax({type: 'DELETE', url: 'someurl.com', data: {id: 1}});
        #   };
        #   this.on('click', utils.once(myHandler));
        #
        once: (func) ->
            ran = false
            result = null

            ->
                return result if ran

                result = func.apply this, arguments
                ran = true

                result

        # Generate a unique integer id (unique within the entire client session).
        # Useful for temporary DOM ids.
        uniqueId: (prefix) ->
            id = (++idCounter) + ''
            if prefix then prefix + id else id
    }
