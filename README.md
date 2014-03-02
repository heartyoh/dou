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
 
## Getting Started
It supports packages for nodejs, bower & rails.

As a gem for rails provides:

  * dou-rails

As a package for nodejs provides:

  * dou

As a package for bower provides:

  * dou

### Install the nodejs module with:
`npm install dou --save`

### Install the bower module with:
`bower install dou --save`

### Configure for requirejs as follow:

```js
requirejs.config({
	...
	paths: {
		'dou'           : 'bower_components/dou/dou'
	},
	shim: {
		dou: {
			exports: 'dou'
		}
	},
	...
});
```

### Install the rails module with Gemfile

```ruby
gem "dou-rails"
```

And run `bundle install`. The rest of the installation depends on
whether the asset pipeline is being used.

### Rails 3.1 or greater (with asset pipeline *enabled*)

The dou-rails files will be added to the asset pipeline and available for you to use. If they're not already in `app/assets/javascripts/application.js` by default, add these lines:

```js
//= require dou-min
```

## Usage

### Define Class

```js
var dou = require('dou');

var Super = dou.define({
	/* members are class members (methods or variable), not instance members */
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
	/* 'this' is prototype of Target Class. in this case Clazz.prototype */
	this.methodD = function() { return 'foo'; };
}

function mixin2() {
	/* 'this' is prototype of Target Class. in this case Clazz.prototype */
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
	this.before('methodA', function(arg) {
		/* before logic */
		...
	});
	this.after('methodB', function(arg) {
		/* after logic */
		...
	});
	this.around('methodC', function(origin, arg) {
		/* before logic */
		...
		
		/* origin logic */
		origin(arg);

		/* after logic */
		...
	});
}

var Clazz = dou.define({
	extend : Super,
	/* dou.with.advice should be mixed in. */
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
	/* dou.with.property includes dou.with.event mixin */
	mixins : [dou.with.property]
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
	/* dou.with.lifecycle includes 2 mixins (dou.with.property and dou.with.event) */
	mixins : [dou.with.lifecycle],
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
