"use strict";

define(['dou'], function (dou) {

  describe('(Core) Dou', function() {

    describe('define', function () {

      it('should define a new class', function () {
        var Clazz = dou.define({
          mixins : function() {
            this.f = function() {return 'f'};
          }
        });

        var inst = new Clazz();

        expect(inst.f()).to.equal('f');
      });
    });

    describe('mixin', function() {

      it('should mixin a function set to the new class', function () {
        var Clazz = dou.define({
          mixins : dou.with.property
        });

        var inst = new Clazz();

        inst.set('foo', 'bar');

        expect(inst.get('foo')).to.equal('bar');
      });

      it('should mixin many function sets to the new class by mixins array', function () {
        var Clazz = dou.define({
          mixins : [
            dou.with.property, 
            dou.with.event
          ]
        });

        var inst = new Clazz();

        inst.set('foo', 'bar');

        expect(inst.get('foo')).to.equal('bar');
        expect(inst.trigger).not.to.equal(undefined);
      });
    });

    describe('extend', function() {

      it('should extend class with extend property', function () {
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
});

