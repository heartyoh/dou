# ==========================================
# Copyright 2014 Hatio, Lab.
# Licensed under The MIT License
# http://opensource.org/licenses/MIT
# ==========================================

define [
  './advice'
  './compose'
  './debug'
  './event'
  './lifecycle'
  './property'
  './serialize'
  './utils',
  './dou'
], (advice, compose, debug, event, lifecycle, property, serialize, utils, dou) ->

    "use strict"

    {
      advice: advice
      compose: compose
      debug: debug
      event: event
      lifecycle: lifecycle
      property: property
      serialize: serialize
      utils: utils
      dou: dou
    }
