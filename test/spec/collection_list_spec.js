"use strict";

define(['dou', 'collection'], function (dou, collection) {

  describe('collection.withList', function () {

    var target;

    beforeEach(function() {
      var Clazz = dou.define({
        mixins: collection.withList
      });

      target = new Clazz();
    });

    describe('append', function () {
      it('should increase size of the collection', function() {
        expect(target.size()).to.equal(0);

        target.append('1');

        expect(target.size()).to.equal(1);
      });

      it('should append item at the end position of the collection', function() {
        target.append('1');
        target.append('2');
        target.append('3');

        expect(target.indexOf('3')).to.equal(2);
      });

    });

    describe('prepend', function () {
      it('should insert item at the front position of the collection', function() {
        target.prepend('1');
        target.prepend('2');
        target.prepend('3');

        expect(target.indexOf('3')).to.equal(0);
      });

    });

    describe('getAt', function () {
      it('should return object at the index', function() {
        target.append('1');
        target.append('2');
        target.append('3');

        expect(target.getAt(2)).to.equal('3');
      });

    });

    describe('insert', function () {
      it('should insert item at the specified position of the collection', function() {
        target.append('1');
        target.append('2');
        target.append('4');

        target.insertAt(2, '3');

        expect(target.indexOf('3')).to.equal(2);
        expect(target.indexOf('4')).to.equal(3);
      });

    });

    describe('remove', function () {
      it('should remove item in the collection', function() {
        target.append('1').append('2').append('3').append('4').remove('3');

        expect(target.size()).to.equal(3);
        expect(target.indexOf('3')).to.equal(-1);
      });

    });

    describe('forEach', function () {
      it('should execute required function for all items in the collection', function() {
        var sum = 0;
        target.append(1).append(2).append(3).append(4).forEach(function(item) {
          sum += item;
        });

        expect(sum).to.equal(10);
      });

      it('should execute required function by the specified context', function() {
        var context = {
          sum : 0
        };

        target.append(1).append(2).append(3).append(4).forEach(function(item) {
          this.sum += item;
        }, context);

        expect(context.sum).to.equal(10);
      });
    });

    describe('clear', function () {
      it('should remove all items in the collection', function() {
        target.append(1).append(2).append(3).append(4);
        expect(target.size()).to.equal(4);
        target.clear();
        expect(target.size()).to.equal(0);
      });

      it('should execute required function by the specified context', function() {
        var context = {
          sum : 0
        };

        target.append(1).append(2).append(3).append(4).forEach(function(item) {
          this.sum += item;
        }, context);

        expect(context.sum).to.equal(10);
      });
    });

  });

});

