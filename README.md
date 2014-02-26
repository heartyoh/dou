dou 
===========================
Light-weight javascript module framework
(Inspired by flight - A component-based, event-driven JavaScript framework from Twitter 
http://flightjs.github.io/)

## 'dou' means ..
 * 都 (together) - Chinese pinyin
 * Do you .. - English

## Features
 * Advice
 * Mixin
 * Event
 * Property
 * Life Cycle
 
## Usage

```js
var dou = require('dou');

function Super() {
...
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

inst.methodA();
inst.methodB();

```

## License
Copyright (c) 2014 Hearty, Oh. Licensed under the MIT license.
