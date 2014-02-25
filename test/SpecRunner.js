require.config({
  baseUrl: '..',
  paths: {
    'mocha'         : 'test/bower_components/mocha/mocha',
    'jasmine'       : 'test/bower_components/jasmine/mocha',
    'chai'          : 'test/bower_components/chai/chai',
    'dou'           : 'dou'
  },
  shim: {
    dou: {
      deps: []
    },
    mocha: {
      exports: 'mocha'
    }
  },
  urlArgs: 'bust=' + (new Date()).getTime()
});
 
require(['require', 'chai', 'mocha'], function(require, chai){
 
  this.assert = chai.assert;
  this.expect = chai.expect;
  var should = chai.should();

  mocha.setup('bdd');
 
  require([
    'utils',
    'property',
    'advice',
    'dou',
    'lifecycle',
    'mixin',
    'serialize'
  ].map(function(t) {return 'spec/' + t + '_spec.js'})
  , function(require) {
    mocha.run();
  });
 
});