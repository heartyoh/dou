"use strict";

define(['property', 'compose'], function (property, compose) {

  describe('property mixin', function () {

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

    it('should notify change event if attributes are changed.', function () {
      var base = {
      };

      compose.mixin(base, [property]);

      var before, after;

      base.on('change', function(e) {
        before = e.before;
        after = e.after;
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

  describe('Property change event', function() { 
      describe('#set() #get()', function () {
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
          
          var ev;
          dog.on('change', function(e) {
            ev = e;
          });
          
          dog.set('buck', 'puck');

          expect(ev.before.buck).to.equal(undefined);
          expect(ev.after.buck).to.equal('puck');
        });
      });      
  });
});

