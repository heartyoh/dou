"use strict";

define(['build/js/lifecycle', 'build/js/compose'], function (lifecycle, compose) {

  describe('lifecycle', function () {

    it('should be merged default attributes to initial attributes.', function () {
      var base = {
        defaults : {
          a : 'a',
          b : 'b'
        }
      };

      compose.mixin(base, [lifecycle]);

      var before, after;

      base.on('change', function(e) {
        before = e.before;
        after = e.after;
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

