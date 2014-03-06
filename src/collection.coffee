# ==========================================
# Copyright 2014 Hatio, Lab.
# Licensed under The MIT License
# http://opensource.org/licenses/MIT
# ==========================================

define [
], ->
    
    "use strict"

    list = 
        insertAt: (index, item) ->
            return this if not this.__collection__
            index = this.__collection__.indexOf item
            this.__collection__.splice(index, 0, item) if this.__collection__.indexOf(item) is -1
            this

        append: (item) ->
            this.__collection__ || (this.__collection__ = [])
            this.__collection__.push(item) if this.__collection__.indexOf(item) is -1
            this

        prepend: (item) ->
            this.__collection__ || (this.__collection__ = [])
            this.__collection__.unshift(item) if this.__collection__.indexOf(item) is -1
            this

        remove: (item) ->
            return this if not this.__collection__
            idx = this.__collection__.indexOf item
            this.__collection__.splice(idx, 1) if idx > -1
            this

        get: (index) ->
            return this.__collection__[index] if this.__collection__
            
        forEach: (fn, context) ->
            return this if not this.__collection__
            this.__collection__.forEach(fn, context)

        indexOf: (item) ->
            (this.__collection__ || []).indexOf(item)

        size: ->
            (this.__collection__ || []).length

        clear: ->
            this.__collection__ = []


    stack =
        push: (item) ->
            throw new Error('Not Implemented Yet')

        pop: ->
            throw new Error('Not Implemented Yet')

    collection =
        withList: ->
            (this[k] = v) for own k, v of list

        withStack: ->
            (this[k] = v) for own k, v of stack

    collection