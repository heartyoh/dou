# ==========================================
# Copyright 2014 Hatio, Lab.
# Licensed under The MIT License
# http://opensource.org/licenses/MIT
# ==========================================

define [
    './utils'
    './compose'
    './event'
], (utils, compose, event) ->
    
    "use strict"

    set = (key, val)->

        return this if !key

        if arguments.length > 1 && typeof(arguments[0]) is 'string'
            attrs = {}
            attrs[key] = val
            return this.set attrs

        this.attrs || (this.attrs = {})

        attrs = key
        after = {}
        before = {}

        (before[key] = val) for own key, val of this.attrs

        utils.push this.attrs, attrs

        for own key, val of this.attrs
            if val isnt before[key]
                after[key] = val
            else
                delete before[key]

        if Object.keys(after).length isnt 0
            this.trigger 'change', this, before, after

        return this

    get = (attr) ->
        this.attrs && this.attrs[attr]

    ->
        # plugin dependency : event.withEvent
        compose.mixin this, event.withEvent

        this.set = set
        this.get = get
