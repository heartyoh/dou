# ==========================================
# Copyright 2014 Hatio, Lab.
# Licensed under The MIT License
# http://opensource.org/licenses/MIT
# ==========================================

define [
    './utils'
    './debug'
], (utils, debug) ->
    
    "use strict"

    # enumerables are shims - getOwnPropertyDescriptor shim doesn't work
    canWriteProtect = debug.enabled && !utils.isEnumerable Object, 'getOwnPropertyDescriptor'
    # whitelist of unlockable property names
    dontLock = ['mixedIn', 'mixingIn']

    if canWriteProtect
        try
            # IE8 getOwnPropertyDescriptor is built-in but throws exeption on non DOM objects
            Object.getOwnPropertyDescriptor Object, 'keys'
        catch e
            canWriteProtect = false

    setPropertyWritability = (obj, isWritable) ->
        return if !canWriteProtect

        props = Object.create null

        for own key of obj
            if dontLock.indexOf key < 0
                desc = Object.getOwnPropertyDescriptor obj, key
                desc.writable = isWritable
                props[key] = desc

        Object.defineProperties obj, props

    unlockProperty = (obj, prop, op) ->
        return op.call(obj) if !canWriteProtect || !obj.hasOwnProperty prop

        writable = Object.getOwnPropertyDescriptor(obj, prop).writable
        Object.defineProperties obj, prop, { writable: true }

        op.call obj
        Object.defineProperties obj, prop, { writable: writable }

    mixin = (base, mixins) ->
        return this.mixin base, [mixins] unless (mixins instanceof Array)

        base.mixedIn = if base.hasOwnProperty 'mixedIn' then base.mixedIn else []
        base.mixingIn = if base.hasOwnProperty 'mixingIn' then base.mixingIn else []

        setPropertyWritability base, false

        for mixin in mixins when base.mixedIn.indexOf(mixin) is -1
            throw new Error('found cyclic dependencies between ' + base.mixingIn) if base.mixingIn.indexOf(mixin) > -1

            base.mixingIn.push mixin
            mixin.call base
            base.mixingIn.pop()
            base.mixedIn.push mixin

        setPropertyWritability base, true
        base

    {
        mixin: mixin
        unlockProperty: unlockProperty
    }
