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
            return this if not @__collection__
            index = @__collection__.indexOf item
            @__collection__.splice(index, 0, item) if @__collection__.indexOf(item) is -1
            this

        append: (item) ->
            @__collection__ || (@__collection__ = [])
            @__collection__.push(item) if @__collection__.indexOf(item) is -1
            this

        prepend: (item) ->
            @__collection__ || (@__collection__ = [])
            @__collection__.unshift(item) if @__collection__.indexOf(item) is -1
            this

        remove: (item) ->
            return this if not @__collection__
            idx = @__collection__.indexOf item
            @__collection__.splice(idx, 1) if idx > -1
            this

        getAt: (index) ->
            return @__collection__[index] if @__collection__
            
        forEach: (fn, context) ->
            return this if not @__collection__
            @__collection__.forEach(fn, context)

        indexOf: (item) ->
            (@__collection__ || []).indexOf(item)

        size: ->
            (@__collection__ || []).length

        clear: ->
            @__collection__ = []

        moveForward: (item) ->
            index = @indexOf(item)
            return if index is -1 or index is 0
            @__collection__[index] = @__collection__[index - 1]
            @__collection__[index - 1] = item

        moveBackward: (item) ->
            index = @indexOf(item)
            return if (index is -1) or (index is @size() - 1)
            @__collection__[index] = @__collection__[index + 1]
            @__collection__[index + 1] = item

        moveToHead: (item) ->
            index = @indexOf(item)
            return if index is -1 or index is 0
            head = @__collection__.splice(0, index)
            tail = @__collection__.splice(1)
            @__collection__ = @__collection__.concat(head, tail)

        moveToTail: (item) ->
            index = @indexOf(item)
            return if index is -1 or (index is @size() - 1)
            head = @__collection__.splice(0, index)
            tail = @__collection__.splice(1)
            @__collection__ = head.concat(tail, @__collection__)

    stack =
        push: (item) ->
            throw new Error('Not Implemented Yet')

        pop: ->
            throw new Error('Not Implemented Yet')

    List = ->
    List.prototype = list

    Stack = ->
    Stack.prototype = stack

    collection =
        List: List
        Stack: Stack
        withList: ->
            (this[k] = v) for own k, v of list

        withStack: ->
            (this[k] = v) for own k, v of stack

    collection