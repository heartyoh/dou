# ==========================================
# Copyright 2014 Hatio, Lab.
# Licensed under The MIT License
# http://opensource.org/licenses/MIT
# ==========================================

define [
    './compose'
    './advice'
    './lifecycle'
    './property'
    './serialize'
    './event'
], (compose, advice, lifecycle, property, serialize, event) ->
    
    "use strict"

    define = (options, constructor, prototype) ->
        constructor || (constructor = ->)

        if options.extends
            class Component extends options.extends
                constructor: constructor
        else
            class Component
                constructor: constructor

        if options.members
            (Component.prototype[name] = value) for own name, value of options.members

        if prototype
            (Component.prototype[name] = value) for own name, value of prototype

        if options.mixins
            compose.mixin Component.prototype, options.mixins

        if options.name
            Component.name = options.name

        Component

    mixin = (target, withs) ->
        compose.mixin (if typeof target is 'function' then target.prototype else target), withs

    {
        define: define
        mixin: mixin
        with:
            advice: advice.withAdvice
            property: property
            lifecycle: lifecycle
            event: event.withEvent
            serialize: serialize
    }
