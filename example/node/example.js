var dou = require('../../src/dou-node')

function Super() {
}

function mixin1() {
	this.methodA = function() { return 'foo'; };
}

function mixin2() {
	this.methodB = function() { return 'bar'; };
}

var Clazz = dou.define({
	extend : Super,
	mixins : [mixin1, mixin2]
});

var inst = new Clazz();

console.log(inst.methodA());
console.log(inst.methodB());
