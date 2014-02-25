require('amdefine/intercept');

var dou = require('../build/js/dou');

for(var key in dou) {
	exports[key] = dou[key]
}
