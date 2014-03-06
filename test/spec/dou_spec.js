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

      it('should define constructor method for the class', function () {
        var Clazz = dou.define({}, function(a) {
          this.a = a;
        });

        var inst = new Clazz('A');

        expect(inst.a).to.equal('A');
      });

      it('should define prototype for the class', function () {
        var Clazz = dou.define({}, function(a) {
          this.a = a;
        }, {
          fa : function() {
            return this.a;
          }
        });

        var inst = new Clazz('A');

        expect(inst.fa()).to.equal('A');
      });

      it('should define class members(same as prototype) for the class', function () {
        var Clazz = dou.define({
          members: {
            fa : function() {
              return this.a;
            }
          }
        }, function(a) {
          this.a = a;
        });

        var inst = new Clazz('A');

        expect(inst.fa()).to.equal('A');
      });

    });

    describe('mixin', function() {
      function Target() {
      }
      Target.prototype = {
        tf : function() { return 'tf'; }
      }

      it('should add functions defined in mixin to the target class', function() {
        dou.mixin(Target, dou.with.event);

        var t1 = new Target();

        var result;

        t1.on('foo', function(e) {
          result = e;
        });

        t1.trigger('foo', 'bar');

        result.should.equal('bar');
      });
    });
  });
});

