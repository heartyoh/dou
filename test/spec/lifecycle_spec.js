"use strict";

define(['lifecycle', 'compose'], function (lifecycle, compose) {

  describe('(Core) Lifecycle', function () {

    it('should be merged default attributes to initial attributes.', function () {
      var base = {
        defaults : {
          a : 'a',
          b : 'b'
        }
      };

      compose.mixin(base, [lifecycle]);

      var before, after;

      base.on('change', function(obj, _before, _after) {
        before = _before;
        after = _after;
      });

      base.initialize({
        a: 'A',
        c: 'c',
        d: 'd'
      });

      expect(base.get('a')).to.equal('A');

      expect(before).not.to.include.keys('a');
      expect(after).to.include.keys('a');
    });

  });

});

