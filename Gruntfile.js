'use strict';

var fs = require('fs'),
    path = require('path'),
    childProcess = require('child_process');

exports = module.exports = function (grunt) {

    // Load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        clean: {
            dist: [ 'dist' ],
            tmp: [ 'tmp' ],
            vendor: [ 'web/js/vendor/*' ],
            templates: [ 'web/js/app/templates' ],
            bootstrapLessCssWeb: [ 'web/css/bootstrap' ],
            requireJsBuildTxt: [ 'dist/js/build.txt' ],
        },
        mkdir: {
            options: {
                mode: '0755'
            },
            dist: {
                options: {
                    create: [ 'dist' ]
                }
            },
            tmp: {
                options: {
                    create: [ 'tmp' ]
                }
            },
            templates: {
                options: {
                    create: [ 'web/js/app/templates' ]
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '{app,bin,config,lib,test}/{,*/}*.js',
                'server.js',
                'web/js/main.js',
                'web/js/{app,config,lib}/{,*/}*.js'
            ]
        },
        copy: {
            bootstrapBowerToTmp: {
                files: [{
                    expand: true,
                    cwd: 'bower_components',
                    src: 'bootstrap/**',
                    dest: 'tmp'
                }],
            },
            bootstrapJsTmpToVendor: {
                files: [{
                    expand: true,
                    cwd: 'tmp/bootstrap/amd/src',
                    src: '*.js',
                    dest: 'web/js/vendor/bootstrap'
                }]
            },
            jsBowerToVendor: {
                files: [{
                    src: 'bower_components/html5shiv/dist/html5shiv.js',
                    dest: 'web/js/vendor/html5shiv.js'
                }, {
                    src: 'bower_components/requirejs/require.js',
                    dest: 'web/js/vendor/require.js'
                }, {
                    src: 'bower_components/jquery/jquery.js',
                    dest: 'web/js/vendor/jquery.js'
                }, {
                    src: 'bower_components/two/build/two.js',
                    dest: 'web/js/vendor/two.js'
                }]
            },
            cssBowerToVendor: {
                files: []
            },
            imgBowerToVendor: {
                files: []
            },
            bootstrapLessCssBowerToVendor: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/bootstrap/less',
                    src: '*.less',
                    dest: 'web/css/vendor/bootstrap'
                }]
            },
        },
        css: {
            default: []
        },
        amd: {
            bootstrap: {
                dir: 'tmp/bootstrap',
                noTransition: true
            },
            default: []
        },
        requirejs: {
            dist: {
                options: {
                    appDir: 'web/js',
                    baseUrl: './',
                    mainConfigFile: 'web/js/main.js',
                    name: 'main',
                    paths: {
                        'socket.io': 'empty:'
                    },
                    dir: 'dist/js',
                    optimize: 'uglify2',
                    wrap: true
                }
            }
        },
        less: {
            dist: {
                options: {
                    yuicompress: true
                },
                files: {
                    'dist/css/main.css': 'web/css/main.less'
                }
            }
        }
    });

    grunt.registerTask('css', 'Replace css content', function (target) {
        target = target || 'default';

        var data = grunt.config.get('css.' + target) || {};
        if (!(data instanceof Array)) {
            data = [ data ];
        }

        data.forEach(function convertModule(module) {
            var src = module.src,
                content = fs.readFileSync(src, 'utf8'),

                replace = module.replace || [];

            grunt.log.write('Converting "' + src + '"...');

            replace.forEach(function modifyContent(item) {
                content = content.replace(item.from, item.to);
            });

            fs.writeFileSync(src, content);
            grunt.log.writeln('OK'.green);
        });
    });

    grunt.registerTask('amd', 'Build AMD scripts', function buildAMD(target) {
        target = target || 'default';

        var data = grunt.config.get('amd.' + target) || {};

        if (target === 'bootstrap') {
            var dir = data.dir,
                noTransition = data.noTransition || true;

            fs.mkdirSync(path.join(dir, 'amd'), '755');

            grunt.log.write('Converting "Twitter Bootstrap"...');

            var cmd = 'node node_modules/bootstrap-amd/bootstrap-amd ' + dir + (noTransition ? ' --no-transition' : ''),
                callback = grunt.task.current.async();

            childProcess.exec(cmd, function executionCompleted(err) {
                grunt.log.writeln('OK'.green);
                callback(err);
            });

        } else if (target === 'default') {
            if (!(data instanceof Array)) {
                data = [ data ];
            }

            data.forEach(function convertModule(module) {
                var src = module.src,
                    content = fs.readFileSync(src, 'utf8'),

                    deps = module.deps || {},
                    files = [],
                    vars = [],
                    replace = module.replace || [],
                    result = module.result;

                grunt.log.write('Converting "' + src + '"...');

                replace.forEach(function modifyContent(item) {
                    content = content.replace(item.from, item.to);
                });

                if (module.deps !== false) {
                    for (var file in deps) {
                        if (deps.hasOwnProperty(file)) {
                            files.push('\'' + file + '\'');
                            vars.push(deps[file]);
                        }
                    }

                    content =
                        'define([' + files.join(', ') + '], ' +
                        'function (' + vars.join(', ') + ') {\n' +
                            content +
                            (result ? '\nreturn ' + result + ';' : '') +
                        '\n});';
                }

                fs.writeFileSync(src, content);
                grunt.log.writeln('OK'.green);
            });
        }
    });

    grunt.registerTask('build', 'Build stuffs', function buildTarget(target) {
        target = target || 'dev';

        var tasks = [
            'clean:tmp',
            'mkdir:tmp',

            // Copy vendor assets
            'clean:vendor',
            'copy:jsBowerToVendor',
            'copy:cssBowerToVendor',
            'copy:imgBowerToVendor',

            // Fix bower css content
            'css:default',

            // Convert modules to AMD-style
            'amd:default',

            // Bootstrap will be converted to AMD-style and copied separately
            'copy:bootstrapBowerToTmp',
            'amd:bootstrap',
            'copy:bootstrapJsTmpToVendor',

            // Bootstrap LessCSS
            'clean:bootstrapLessCssWeb',
            'copy:bootstrapLessCssBowerToVendor',

            'clean:tmp',

            /*'clean:templates',
            'mkdir:templates',
            'handlebars'*/
        ];

        if (target === 'prod') {
            [
                'clean:dist',
                'mkdir:dist',

                'requirejs:dist',
                'clean:requireJsBuildTxt',

                'less:dist'

            ].forEach(function pushTask(task) {
                tasks.push(task);
            });
        }

        grunt.task.run(tasks);
    });

    grunt.registerTask('test', 'Run tests', [
        'jshint'
    ]);

    grunt.registerTask('deploy', 'Build and deploy for production', [
        'build:prod'
    ]);

    grunt.registerTask('default', 'Run tests then build for development', [
        'test',
        'build:dev'
    ]);

};
