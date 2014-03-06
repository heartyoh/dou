"use strict";

define(['property', 'compose'], function (property, compose) {

  describe('(Core) Property', function () {

    describe('get/set', function() {

      it('should change attributes as a set of new values.', function () {
        var base = {
        };

        compose.mixin(base, [property]);

        base.set({
          a: 'a',
          b: 'b'
        });

        expect(base.get('a')).to.equal('a');

        base.set({
          a: 'A'
        });

        expect(base.get('a')).to.equal('A');
        expect(base.get('b')).to.equal('b');
      });
    });

    describe('notify change event', function() {

      it('should emit change event when its properties are changed', function () {

        var Animal = function (name) {
            this.name = name;
        };
            
        Animal.prototype = {
            getName : function () {
                return this.name;
            }
        }
        compose.mixin(Animal.prototype, property);
    
        var dog = new Animal('wang');
        
        var _before;
        var _after;
        dog.on('change', function(obj, before, after) {
          _before = before;
          _after = after;
        });
        
        dog.set('buck', 'puck');

        expect(_before.buck).to.equal(undefined);
        expect(_after.buck).to.equal('puck');
      });

      it('should notify change event with before and after values.', function () {
        var base = {
        };

        compose.mixin(base, [property]);

        var before, after;

        base.on('change', function(target, _before, _after) {
          before = _before;
          after = _after;
        });

        base.set({
          a: 'a',
          b: 'b'
        });

        expect(before).not.to.include.keys('a');
        expect(before).not.to.include.keys('b');
        expect(after).to.include.keys('a');
        expect(after).to.include.keys('b');

        base.set({
          a: 'A',
          b: 'b',
          c: 'C'
        });

        expect(before).to.include.keys('a');
        expect(before).not.to.include.keys('b');
        expect(after).to.include.keys('a');
        expect(after).not.to.include.keys('b');
        expect(after).to.include.keys('c');
      });
    });
  });
});

