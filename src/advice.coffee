# ==========================================
# Copyright 2014 Hatio, Lab.
# Licensed under The MIT License
# http://opensource.org/licenses/MIT
# ==========================================

define [
    './compose'
], (compose) ->
    
    "use strict"

    advice = 
        around: (base, wrapped) ->
            ->
                # unpacking arguments by hand benchmarked faster
                l = arguments.length
                args = new Array(l + 1)
                args[0] = base.bind(this)
                args[i + 1] = arguments[i] for el, i in args

                wrapped.apply this, args

        before: (base, before) ->
            beforeFn = if typeof before == 'function' then before else before.obj[before.fnName]
            ->
                beforeFn.apply this, arguments
                base.apply this, arguments

        after: (base, after) ->
            afterFn = (if typeof after == 'function' then after else after.obj[after.fnName])
            ->
                res = (base.unbound || base).apply(this, arguments)
                afterFn.apply this, arguments
                res

        # a mixin that allows other mixins to augment existing functions by adding additional
        # code before, after or around.
        withAdvice: ->
            ['before', 'after', 'around'].forEach (m) ->
                this[m] = (method, fn) ->
                    compose.unlockProperty this, method, ->
                        if(typeof this[method] is 'function')
                            this[method] = advice[m] this[method], fn
                        else
                            this[method] = fn

                        this[method]
            , this

    advice