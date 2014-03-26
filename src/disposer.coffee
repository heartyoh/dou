# ==========================================
# Copyright 2014 Hatio, Lab.
# Licensed under The MIT License
# http://opensource.org/licenses/MIT
# ==========================================

define [
    './compose'
    './advice'
], (compose, advice) ->

    "use strict"

    addDisposer = (callback) ->
        @__disposers = [] if not @__disposers
        @__disposers.push callback

    dispose = ->
        return if not @__disposers
        if @__disposers
            for callback in @__disposers
                callback.call this

    ->
        @addDisposer = addDisposer

        if @dispose
            # plugin dependency : advice.withAdvice
            compose.mixin this, advice.withAdvice
            @after 'dispose', dispose
        else
            @dispose = dispose