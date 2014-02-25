dou
=======

Light-weight javascript module framework

## Features
 * Mixin base
 
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
