module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '.',

    frameworks: ['mocha', 'chai', /*, 'commonjs'*/],

    // list of files / patterns to load in the browser
    files: [
      'bower_components/es5-shim/es5-shim.js',
      'bower_components/es5-shim/es5-sham.js',

      // hack to load RequireJS after the shim libs
      'node_modules/requirejs/require.js',
      'node_modules/karma-requirejs/lib/adapter.js',

      // loaded with require
      {pattern: 'src/*.coffee', included: false},

      {pattern: 'test/spec/**/*_spec.js', included: false},

      'test/karma-test-main.js'
    ],

    // list of files to exclude
    exclude: [
      // 'client/main.js'
    ],

    preprocessors: {
      // 'client/*.js': ['commonjs'],
      // 'test/client/*.js': ['commonjs'],
      'src/**/*.coffee': ['coffee']
    },

    coffeePreprocessor: {
      // options passed to the coffee compiler
      options: {
        bare: true,
        sourceMap: false
      },
      // transforming the filenames
      transformPath: function(path) {
        return path.replace(/\.coffee$/, '.js').replace(/\/src\//, '/build/js/');
      }
    },

    // use dots reporter, as travis terminal does not support escaping sequences
    // possible values: 'dots', 'progress'
    // CLI --reporters progress
    reporters: ['progress'/*, 'junit'*/],

    // junitReporter: {
    //   // will be resolved to basePath (in the same way as files/exclude patterns)
    //   outputFile: 'test-results.xml'
    // },

    // web server port
    // CLI --port 9876
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    // CLI --colors --no-colors
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    // CLI --log-level debug
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    // CLI --auto-watch --no-auto-watch
    autoWatch: true,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    // CLI --browsers Chrome,Firefox,Safari
    browsers: [process.env.TRAVIS ? 'Firefox' : 'Chrome'],

    // If browser does not capture in given timeout [ms], kill it
    // CLI --capture-timeout 5000
    captureTimeout: 20000,

    // Auto run tests on start (when browsers are captured) and exit
    // CLI --single-run --no-single-run
    singleRun: false,

    // report which specs are slower than 500ms
    // CLI --report-slower-than 500
    reportSlowerThan: 500,

    plugins: [
      'karma-mocha',
      'karma-chai',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-coffee-preprocessor'
      // 'karma-junit-reporter',
      // 'karma-commonjs'
    ]
  });
};