"use strict";

define(['serialize', 'compose'], function (serialize, compose) {

  describe('(Core) Serialize', function () {

    it('should generate stringified object notation contained attributes information.', function () {
      var base = {
        defaults : {
          a : 'a',
          b : 'b'
        }
      };

      compose.mixin(base, serialize);

      base.set({
        c: 'c',
        d: 'd'
      });

      console.log('[' + base.serialize() + ']');
    });

  });

});

