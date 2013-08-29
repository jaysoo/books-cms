'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'
// templateFramework: 'lodash'

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var projectConfig = {
    app: 'app',
    dist: 'dist'
  };

  grunt.initConfig({
    project: projectConfig,
    watch: {
      options: {
        nospawn: true
      },
      coffee: {
        files: ['<%= project.app %>/scripts/{,*/}*.coffee'],
        tasks: ['coffee:dist']
      },
      coffeeTest: {
        files: ['test/spec/{,*/}*.coffee'],
        tasks: ['coffee:test']
      },
      compass: {
        files: ['<%= project.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass']
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          '<%= project.app %>/*.html',
          '{.tmp,<%= project.app %>}/styles/{,*/}*.css',
          '{.tmp,<%= project.app %>}/scripts/{,*/}*.js',
          '<%= project.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}'
        ]
      },
      jst: {
        files: [
          '<%= project.app %>/scripts/templates/*.ejs'
        ],
        tasks: ['jst']
      }
    },
    connect: {
      options: {
        port: 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, projectConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test'),
              mountFolder(connect, projectConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, projectConfig.dist)
            ];
          }
        }
      }
    },
    open: {
      server: {
        path: 'http://0.0.0.0:<%= connect.options.port %>'
      }
    },
    clean: {
      dist: ['.tmp', '<%= project.dist %>/*'],
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= project.app %>/scripts/{,*/}*.js',
        '!<%= project.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://0.0.0.0:<%= connect.options.port %>/index.html']
        }
      }
    },
    coffee: {
      dist: {
        files: [{
          // rather than compiling multiple files here you should
          // require them into your main .coffee file
          expand: true,
          cwd: '<%= project.app %>/scripts',
          src: '{,*/}*.coffee',
          dest: '.tmp/scripts',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: '.tmp/spec',
          src: '*.coffee',
          dest: 'test/spec'
        }]
      }
    },
    compass: {
      options: {
        sassDir: '<%= project.app %>/styles',
        cssDir: '.tmp/styles',
        imagesDir: '<%= project.app %>/images',
        javascriptsDir: '<%= project.app %>/scripts',
        fontsDir: '<%= project.app %>/styles/fonts',
        importPath: '<%= project.app %>/bower_components',
        relativeAssets: true
      },
      dist: {},
      server: {
        options: {
          debugInfo: true
        }
      }
    },
    requirejs: {
      dist: {
        // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
        options: {
          // `name` and `out` is set by grunt-usemin
          baseUrl: '<%= project.app %>/scripts',
          optimize: 'none',
          preserveLicenseComments: false,
          useStrict: true,
          wrap: true,
          inlineText: true,
          stubModules: ['text'],
          uglify2: {} // https://github.com/mishoo/UglifyJS2
        }
      }
    },
    useminPrepare: {
      html: '<%= project.app %>/index.html',
      options: {
        dest: '<%= project.dist %>'
      }
    },
    usemin: {
      html: ['<%= project.dist %>/{,*/}*.html'],
      css: ['<%= project.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= project.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= project.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= project.dist %>/images'
        }]
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%= project.dist %>/styles/main.css': [
            '.tmp/styles/{,*/}*.css',
            '<%= project.app %>/styles/{,*/}*.css'
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/project/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= project.app %>',
          src: '*.html',
          dest: '<%= project.dist %>'
        }]
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= project.app %>',
          dest: '<%= project.dist %>',
          src: [
            '*.{ico,txt}',
            '.htaccess',
            'images/{,*/}*.{webp,gif}'
          ]
        }]
      }
    },
    bower: {
      all: {
        rjsConfig: '<%= project.app %>/scripts/main.js'
      }
    },
    jst: {
      options: {
        amd: true
      },
      compile: {
        files: {
          '.tmp/scripts/templates.js': ['<%= project.app %>/scripts/templates/*.ejs']
        }
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= project.dist %>/scripts/{,*/}*.js',
            '<%= project.dist %>/styles/{,*/}*.css',
            '<%= project.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
            '<%= project.dist %>/styles/fonts/*'
          ]
        }
      }
    }
  });

  grunt.registerTask('createDefaultTemplate', function () {
    grunt.file.write('.tmp/scripts/templates.js', 'this.JST = this.JST || {};');
  });

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'coffee:dist',
      'createDefaultTemplate',
      'jst',
      'compass:server',
      'connect:livereload',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'coffee',
    'createDefaultTemplate',
    'jst',
    'compass',
    'connect:test',
    'mocha'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'coffee',
    'createDefaultTemplate',
    'jst',
    'compass:dist',
    'useminPrepare',
    'requirejs',
    'imagemin',
    'htmlmin',
    'concat',
    'cssmin',
    'uglify',
    'copy',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'test',
    'build'
  ]);
};
