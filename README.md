dou 
===========================
Light-weight javascript module framework
(Inspired by flight - A component-based, event-driven JavaScript framework from Twitter 
http://flightjs.github.io/)

## 'dou' means ..
 * 都 (all) - Chinese pinyin
 * Do you .. - English

## Features
 * Advice
 * Mixin
 * Event
 * Property
 * Life Cycle
 
## Usage

### Define Class

```js
var dou = require('dou');

var Super = dou.define({
	members: {
		methodA: function() {...},
		methodB: function() {...}
	}
});

var inst = new Super();

inst.methodA();

```

### Extend

```js

var Clazz = dou.define({
	extend : Super,
	members : {
		methodC: function() {...}
	}
});

var inst = new Clazz();

inst.methodA();
inst.methodB();
inst.methodC();

```

### Constructor

```js

var Clazz = dou.define({
		extend : Super
	}, 
	/* constructor */
	function(arg) {
		// construction goes here
	}
);

var inst = new Clazz(arg);

```

### Mixin

```js

function mixin1() {
	this.methodD = function() { return 'foo'; };
}

function mixin2() {
	this.methodE = function() { return 'bar'; };
}

var Clazz = dou.define({
	extend : Super,
	mixins : [mixin1, mixin2]
});

var inst = new Clazz();

inst.methodD();
inst.methodE();

```

### Advice

```js

function mixin() {
	this.before('methodA', function(arg) {...});
	this.after('methodB', function(arg) {...});
	this.around('methodC', function(origin, arg) {
		...
		origin(arg);
		...
	});
}

var Clazz = dou.define({
	extend : Super,
	mixins : [dou.with.advice, mixin]
});

var inst = new Clazz();

inst.methodA('abc');

```

### Event

```js

var Clazz = dou.define({
	mixins : [dou.with.event],
	members : {
		test: function(x) {
			this.trigger('test', x);
		}
	}
});

var inst = new Clazz();

inst.on('test', function(e) {
	console.log(e);
});

inst.test(1);

inst.off('test');

```

### Property

```js

var Clazz = dou.define({
	mixins : [dou.with.property] /* also has event mixin */
});

var inst = new Clazz();

inst.on('change', function(e) {
	console.log(e.before);
	console.log(e.after);
});

inst.set('attr1', 'value1');

inst.set({
	attr1 : 'value1',
	attr2 : 'value2'
});

var val = inst.get('attr1'); // val should be 'value1'

```

### Life Cycle

```js
var Clazz = dou.define({
	mixins : [dou.with.lifecycle], /* alse has property & event mixin */
	members : {
		defaults : {
			attr1: 'A',
			attr2: 'B'
		}
	}
});

var inst = new Clazz();
inst.initialize({
	attr2: 'b'
});

var val1 = inst.get('attr1'); // val1 should be 'A'
var val2 = inst.get('attr2'); // val2 should be 'b'

```
## License
Copyright (c) 2014 Hearty, Oh. Licensed under the MIT license.
