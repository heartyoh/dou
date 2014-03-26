"use strict";

define(['disposer', 'compose'], function (withDisposer, compose) {

  describe('(Core) Disposer', function () {

    describe('object disposer', function() {

      var base;

      beforeEach(function() {
        base = {
        };

        compose.mixin(base, withDisposer);
      });

      it('should invoke all instance disposers when object is disposed.', function () {
        var disposer1 = 0;
        var disposer2 = 0;

        base.addDisposer(function() {disposer1 = 1});
        base.addDisposer(function() {disposer2 = 1});

        base.dispose();

        expect(disposer1).to.equal(1);
        expect(disposer2).to.equal(1);
      });
    });

    describe('object adviced disposer', function() {

      var base;
      var disposed;

      beforeEach(function() {
        disposed = false;

        base = {
          dispose: function() { disposed = true; }
        };

        compose.mixin(base, withDisposer);
      });

      it('should invoke the dispose method and all the instance disposers when object is disposed.', function () {
        var disposer1 = 0;
        var disposer2 = 0;

        base.addDisposer(function() {disposer1 = 1});
        base.addDisposer(function() {disposer2 = 1});

        base.dispose();

        expect(disposed).to.equal(true);
        expect(disposer1).to.equal(1);
        expect(disposer2).to.equal(1);
      });
    });

    describe('class instance disposer', function() {

      var base;

      beforeEach(function() {
        base = function() {
        };

        compose.mixin(base.prototype, withDisposer);
      });

      it('should invoke all disposers when class instance is disposed.', function () {
        var disposer1 = 0;
        var disposer2 = 0;

        var inst = new base();

        inst.addDisposer(function() {disposer1 = 1});
        inst.addDisposer(function() {disposer2 = 1});

        inst.dispose();

        expect(disposer1).to.equal(1);
        expect(disposer2).to.equal(1);
      });
    });

    describe('adviced dispose', function() {
      var base;
      var disposed;

      beforeEach(function() {
        disposed = false;

        base = function() {
        };

        base.prototype = {
            dispose : function () {
                disposed = true;
            }
        };

        compose.mixin(base.prototype, withDisposer);
      });

      it('should invoke the dispose method and all the instance disposers when class instance is disposed.', function () {
        var disposer1 = 0;
        var disposer2 = 0;

        var inst = new base();

        inst.addDisposer(function() {disposer1 = 1});
        inst.addDisposer(function() {disposer2 = 1});

        inst.dispose();

        expect(disposed).to.equal(true);
        expect(disposer1).to.equal(1);
        expect(disposer2).to.equal(1);
      });
    });
  });
});

