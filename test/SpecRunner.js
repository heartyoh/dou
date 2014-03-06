require.config({
  baseUrl: '../build/js',
  paths: {
    'mocha'         : '../../bower_components/mocha/mocha',
    'chai'          : '../../bower_components/chai/chai'
  },
  shim: {
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
    'serialize',
    'event',
    'collection_list'
  ].map(function(t) {return 'spec/' + t + '_spec.js'})
  , function(require) {
    mocha.run();
  });
 
});