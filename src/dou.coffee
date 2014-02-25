# ==========================================
# Copyright 2014 Hatio, Lab.
# Licensed under The MIT License
# http://opensource.org/licenses/MIT
# ==========================================

define [
    './compose'
], (compose) ->
    
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
    }
