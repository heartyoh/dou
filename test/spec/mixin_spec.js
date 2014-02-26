"use strict";

define(['utils', 'compose'], function (utils, compose) {

  describe('(Core) mixin', function () {

    // var canWriteProtect = !utils.isEnumerable(Object, 'getOwnPropertyDescriptor');

    //TODO: temporarily turn off this until we resolvle IE8 and legacy clobbering
    var canWriteProtect = false;

    it('should throw an exception if a mixin tries to overwrite a property', function () {
      var mixItIn = function () {
        compose.mixin({
          myProperty: 23
        }, [function () {
          this.myProperty = 38
        }]);
      };

      if (canWriteProtect) {
        expect(mixItIn).to.throw("Cannot assign to read only property 'myProperty' of #<Component>");
      } else {
        expect(mixItIn).not.to.throw();
      }
    });

    it('should not be changed a protected property even if a mixin tries to overwrite a property', function () {
      var base = {
        myProperty: 23
      };

      compose.mixin(base, [function () {
        this.myProperty = 38
      }]);

      if (canWriteProtect) {
        expect(base.myProperty).to.equal(23);
      } else {
        expect(base.myProperty).to.equal(38);
      }
    });

    it('should not mix in the same mixin twice', function () {
      var base = {mixedInCount: 0};

      var mixMeIn = function () {
        this.mixedInCount++
      };
      var mixMeToo = function () {
        this.mixedInCount++
      };

      compose.mixin(base, [mixMeIn]);
      compose.mixin(base, [mixMeIn]);
      compose.mixin(base, [mixMeToo]);
      compose.mixin(base, [mixMeToo]);

      expect(base.mixedInCount).to.equal(2);
    });

    it('should be able to mixin other dependent mixins', function() {
      var base = {a: 0};
      var mixinA = function() {
        this.b = 1;
      };

      var mixinB = function() {
        compose.mixin(this, [mixinA]);
        this.c = 2;
      };

      compose.mixin(base, [mixinB]);

      expect(base.b).to.equal(1);
      expect(base.mixingIn.length).to.equal(0);
    });

    it('should throw exception if 2 or more mixins have dependencies on each other cyclicly', function() {
      var base = {
        a: 0
      };

      var mixinA = function() {
        compose.mixin(this, [mixinB]);
        this.b = 1;
      };

      var mixinB = function() {
        compose.mixin(this, [mixinA]);
        this.c = 2;
      };

      var mixinC = function() {
        compose.mixin(this, [mixinB]);
        this.d = 3;
      };

      var mixinX = function() {
        this.x = 4;
      };

      var mixinY = function() {
        compose.mixin(this, [mixinX]);
        this.y = 5;
      };

      expect(function() {
        compose.mixin(base, [mixinC]);
      }).to.throw();

      expect(function() {
        compose.mixin(base, [mixinY]);
      }).not.to.throw();
    });

  });

});

