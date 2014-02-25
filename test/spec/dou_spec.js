"use strict";

define(['build/js/dou', 'build/js/serialize', 'build/js/lifecycle'], function (dou, serialize, lifecycle) {

  describe('component', function () {

    it('should define new component type', function () {
      var Clazz = dou.define({
        mixins : function() {
          this.f = function() {return 'f'};
        }
      });

      var inst = new Clazz();

      expect(inst.f()).to.equal('f');
    });

    it('should define new component type', function () {
      function Xyz() {
        this.xxx = function() { return 'xxx'; }
      };

      var Clazz = dou.define({
        extends: Xyz,
        mixins : function() {
          this.yyy = function() { return 'yyy'; }
        }
      });

      var inst = new Clazz();

      var Clazz2 = dou.define({
        extends: Xyz,
        mixins: function() {
          this.yyy = function() { return 'zzz'; }
        }
      });

      var inst2 = new Clazz2();

      expect(inst.yyy()).to.equal('yyy');
      expect(inst2.yyy()).to.equal('zzz');
    });

  });

});

