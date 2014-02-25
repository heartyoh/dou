'use strict';

module.exports = function (grunt) {

  // Show elapsed time at the end
  require('time-grunt')(grunt);
  // Load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    nodeunit: {
      files: ['test/**/*_test.js']
    },
    coffee: {
      // build: {
      //   options: {
      //     bare: true
      //     // sourceMap: true
      //   },
      //   files: {
      //     'build/js/utils.js'    : 'src/utils.coffee',
      //     'build/js/debug.js'    : 'src/debug.coffee',
      //     'build/js/compose.js'  : 'src/compose.coffee',
      //     'build/js/event.js'    : 'src/event.coffee',
      //     'build/js/advice.js'   : 'src/advice.coffee',
      //     'build/js/lifecycle.js': 'src/lifecycle.coffee',
      //     'build/js/property.js' : 'src/property.coffee',
      //     'build/js/dou.js'      : 'src/dou.coffee'
      //   }
      // },

      // compileJoined: {
      //   options: {
      //     join: true
      //   },
      //   files: {
      //     'dou.js': [
      //       'src/utils.coffee',
      //       'src/debug.coffee',
      //       'src/compose.coffee',
      //       'src/event.coffee',
      //       'src/advice.coffee',
      //       'src/lifecycle.coffee',
      //       'src/property.coffee',
      //       'src/dou.coffee'
      //     ] // concat then compile into single file
      //   }
      // },

      // compileWithMapsDir: {
      //   options: {
      //     sourceMap: true,
      //     sourceMapDir: 'path/to/maps/' // source map files will be created here
      //   },
      //   files: {
      //     'path/to/result.js': 'path/to/source.coffee'
      //   }
      // },

      build: {
        options: {
          bare: false,
          join: false,
          sourceMap: false
        },
        expand: true,
        flatten: true,
        cwd: 'src',
        src: ['**/*.coffee'],
        dest: 'build/js',
        ext: '.js'
      }
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      }, 
      build: {
        src: ['build/js/**/*.js'],
        dest: 'dou.js'
      }
    },
    uglify: {
      build: {
        src: 'dou.js',
        dest: 'dou-min.js'
      }
    },
    copy: {
      rails: {
        files: [
          {
            expand: true,
            cwd: '.',
            src: ['dou.js', 'dou-min.js'],
            dest: 'vendor/assets/javascripts/',
            filter: 'isFile'
          }
        ]
      }
    },
    jsbeautifier: {
        files: ["build/js/**/*.js"],
        options: {
        }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['src/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src', 'nodeunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'nodeunit']
      }
    },
    mocha: {
      test: {
        src: ['test/**/*.html'],
        options: {
          run: true,
        }
      }
    },
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: ['pkg'],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['-a'], //['package.json', 'bower.json'], // '-a' for all files
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'upstream',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
      }
    },
    replace: {
      'bump-gem': {
        src: ['lib/dou/version.rb'],
        overwrite: true, // overwrite matched source files
        replacements: [{
          from: /VERSION = \"\S*\"/,
          to: "VERSION = \"<%= pkg.version %>\""
        }]
      }
    },
    changelog: {
      options: {
      }
    }
  });

  grunt.registerTask('bumpup', ['bump-only', 'replace:bump-gem'])
  grunt.registerTask('build', ['coffee:build', 'concat:build', 'uglify:build', 'copy:rails']);

  // Default task.
  grunt.registerTask('default', ['build']);

};
