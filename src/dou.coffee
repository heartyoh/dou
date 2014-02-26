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

    define = (options) ->
        if options.extends
            class Component extends options.extends
        else
            class Component

        if options.mixins
            compose.mixin Component.prototype, options.mixins

        if options.name
            Component.name = options.name

        Component

    {
        define: define
        with:
            advice: advice.withAdvice
            property: property
            lifecycle: lifecycle
            event: event.withEvent
            serialize: serialize
    }
