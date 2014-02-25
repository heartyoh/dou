"use strict";

define(['build/js/utils'], function (utils) {

  describe('(Core) utils', function () {

    describe('merge()', function () {

      var merged, foo, boo, moo;

      beforeEach(function () {
        foo = {a: 32, b: {aa: 33, bb: 94}};
        boo = {c: 44};
        moo = {b: {aa: 37, cc: 58}, d: 78};
      });

      it('creates a copy', function () {
        merged = utils.merge(foo);
        //reassign to merged
        merged = "monkey";
        expect(foo.a).to.equal(32);
      });

      it('merges distinct properties', function () {
        merged = utils.merge({}, foo, boo);
        expect(merged.a).to.equal(32);
        expect(merged.b.aa).to.equal(33);
        expect(merged.b.bb).to.equal(94);
        expect(merged.c).to.equal(44);
      });

      it('recursively merges like properties upon request', function () {
        merged = utils.merge(foo, moo);
        expect(merged.a).to.equal(32);
        expect(merged.b.aa).to.equal(37);
        expect(merged.b.bb).to.equal(94);
        expect(merged.b.cc).to.equal(58);
        expect(merged.d).to.equal(78);
      });

      // it('does not recursively merge when not requested', function () {
      //   merged = utils.merge({}, foo, moo);
      //   expect(merged.a).to.equal(32);
      //   expect(merged.b.aa).to.equal(37);
      //   expect(merged.b.bb).to.equal(undefined);
      //   expect(merged.b.cc).to.equal(58);
      //   expect(merged.d).to.equal(78);
      // });

      it('merges more than two objects', function () {
        merged = utils.merge(foo, boo, moo);
        expect(merged.a).to.equal(32);
        expect(merged.b.aa).to.equal(37);
        expect(merged.b.bb).to.equal(94);
        expect(merged.b.cc).to.equal(58);
        expect(merged.c).to.equal(44);
        expect(merged.d).to.equal(78);
      });

      it('copies extra when base is undefined', function () {
        merged = utils.merge(undefined, foo);
        expect(merged).to.deep.equal(foo);
      });

      it('copies base when extra is undefined', function () {
        merged = utils.merge(moo, undefined);
        expect(merged).to.equal(moo);
      });

      it('returns empty hash when base and extra are undefined', function () {
        merged = utils.merge(undefined, undefined);
        expect(typeof merged).to.equal("object");
        expect(Object.keys(merged).length).to.equal(0);
      });
    });
    
    describe('push()', function () {

      var foo = {a: 32, b: {aa: 33, bb: 94}};
      var boo = {c: 44};
      var moo = {b: {aa: 37, cc: 58}, d: 78};

      it('merges distinct properties', function () {
        var pushed = utils.push(foo, boo);
        expect(pushed.a).to.equal(32);
        expect(pushed.b.aa).to.equal(33);
        expect(pushed.b.bb).to.equal(94);
        expect(pushed.c).to.equal(44);
      });

      it('does not overwrite properties when protect is true', function () {
        expect(function () {
          utils.push(foo, moo, true);
        }).to.throw('utils.push attempted to overwrite "b" while running in protected mode');
      });

      it('recursively merges like properties when protect is false', function () {
        var pushed = utils.push(foo, moo);
        expect(pushed.a).to.equal(32);
        expect(pushed.b.aa).to.equal(37);
        expect(pushed.b.bb).to.equal(94);
        expect(pushed.b.cc).to.equal(58);
        expect(pushed.d).to.equal(78);
      });

      it('returns undefined when base is undefined', function () {
        var pushed = utils.push(undefined, foo);
        expect(pushed).to.equal(undefined);
      });

      it('returns base when extra is undefined', function () {
        var pushed = utils.push(moo, undefined);
        expect(pushed).to.equal(moo);
      });
    });
    
    // describe('throttle()', function () {

    //   it('should only call a throttled function once per interval', function () {

    //     jasmine.Clock.useMock();

    //     var spy = jasmine.createSpy();
    //     var throttledFn = utils.throttle(spy, 500);
    //     throttledFn();
    //     expect(spy.callCount).to.equal(1);
    //     throttledFn();
    //     expect(spy.callCount).to.equal(1);
    //     jasmine.Clock.tick(499);
    //     expect(spy.callCount).to.equal(1);
    //     jasmine.Clock.tick(1);
    //     expect(spy.callCount).to.equal(2);
    //   });
    // });
    
    // describe('debounce()', function () {

    //   it('should only call a debounce\'d function after it has not been called for a given interval', function () {

    //     jasmine.Clock.useMock();

    //     var spy = jasmine.createSpy();
    //     var debouncedFn = utils.debounce(spy, 500);
    //     debouncedFn();
    //     jasmine.Clock.tick(400);
    //     expect(spy).not.toHaveBeenCalled();
    //     debouncedFn();
    //     jasmine.Clock.tick(600);
    //     expect(spy).toHaveBeenCalled();
    //   });
    // });
    
    // describe('countThen()', function () {
    //   it('calls a wrapped function after n invocations', function () {
    //     var spy = jasmine.createSpy();
    //     var fn = utils.countThen(2, spy);
    //     expect(spy).not.toHaveBeenCalled();
    //     fn();
    //     expect(spy).not.toHaveBeenCalled();
    //     fn();
    //     expect(spy).toHaveBeenCalled();
    //   });

    //   it('calls a wrapped function only once', function () {
    //     var spy = jasmine.createSpy();
    //     var fn = utils.countThen(1, spy);
    //     fn();
    //     expect(spy.callCount).to.equal(1);
    //     fn();
    //     expect(spy.callCount).to.equal(1);
    //   });
    // });

    describe('once()', function () {
      it('should only call a function once', function () {
        var sum = 0;
        var increment = utils.once(function () { sum++; });
        increment();
        increment();
        expect(sum).to.equal(1);
      });
    });
  });
});
