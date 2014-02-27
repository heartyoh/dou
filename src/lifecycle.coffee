# ==========================================
# Copyright 2014 Hatio, Lab.
# Licensed under The MIT License
# http://opensource.org/licenses/MIT
# ==========================================

define [
    './compose'
    './property'
], (compose, withProperty) ->

    "use strict"

    initialize = (attrs) ->
        # only assign identity if there isn't one (initialize can be called multiple times)
        attrs || (attrs = {})

        # merge defaults with supplied options
        #
        # cloned = Object.create(attrs) : Not sure why this code does not work
        cloned = {}
        (cloned[key] = val) for own key, val of attrs

        (cloned[key] = val) for own key, val of this.defaults when !cloned.hasOwnProperty(key)

        this.set(cloned)

        this

    despose = ->

    ->
        # plugin dependency : withProperty
        compose.mixin this, withProperty

        this.initialize = initialize

        this.despose = despose
