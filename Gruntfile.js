module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',

        clean: {
            pre: ['build/**/*', '.tmp/**/*'],
            post: ['.tmp/concat', 'template.js']
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'staged/src/index.html': 'staged/src/index.html'
                }
            }
        },

        replace: {
            package: {
                src: 'package.json',
                dest: 'package.json',
                replacements: [{
                    from: /\"version\": \"([\d\.]+)\"/g,
                    to: function (matchedWord, index, fullText, regexMatches) {   // callback replacement
                        return '"version": "' + (parseFloat(regexMatches) + 0.1).toFixed(1) + '"';
                    }
                }]
            },
            index: {
                src: 'staged/src/index.html',
                dest: 'staged/src/index.html',
                replacements: [{
                    from: '../bower_components/',
                    to: 'bower_components/'
                }]
            }
        },

        copy: {
            temp2build: {
                files: [
                    {
                        expand: true,
                        cwd: '.tmp',
                        src: ['**/*'],
                        dest: 'build/src'
                    }
                ]
            },
            app2build: {
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: ['favicon.ico'],
                        dest: 'build/src'
                    },
                    {
                        expand: true,
                        cwd: 'src',
                        src: ['mainfest.mf'],
                        dest: 'build/src'
                    },
                    {
                        expand: true,
                        cwd: 'src',
                        src: ['robots.txt'],
                        dest: 'build/src'
                    },
                    {
                        expand: true,
                        cwd: 'src',
                        src: ['sitemap.xml'],
                        dest: 'build/src'
                    },
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['bower_components/**'],
                        dest: 'build/src'
                    },
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['images/**'],
                        dest: 'build/src'
                    },
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['bin/**'],
                        dest: 'build/src'
                    }
                ]
            },
            app2temp: {
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: ['*.html'],
                        dest: '.tmp'
                    }
                ]
            },
            build2staged: {
                files: [
                    {
                        expand: true,
                        cwd: 'build',
                        src: ['**/*'],
                        dest: 'staged'
                    }
                ]
            },
            staged2dropbox: {
                files: [
                    {
                        expand: true,
                        cwd: 'staged',
                        src: ['js/app.js','js/vendor.js'],
                        dest: 'C:/Users/Oriel.zaken/Dropbox/Public/www/dev'
                    },
                    {
                        expand: true,
                        cwd: 'staged',
                        src: ['css/app.css'],
                        dest: 'C:/Users/Oriel.zaken/Dropbox/Public/www/dev'
                    }
                ]
            },
            staged2install: {
                files: [
                    {
                        expand: true,
                        cwd: 'staged/src',
                        src: ['**/*'],
                        dest: 'C:/Installation/app/src'
                    }
                ]
            }
        },

        useminPrepare: {
            html: 'src/*.html',
            options: {
                dest: '.tmp'
            }
        },

        usemin: {
            html: '.tmp/*.html'
        },

        'ftp-deploy': {
            dev: {
                auth: {
                    host: 'ftp.yourtubedownloader.com',
                    port: 21,
                    authKey: 'Cred'
                },
                src: 'staged/js',
                dest: '/public_html/assets/dev/js',
                exclusions: ['localBundle.js']
            }
        }

    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-ftp-deploy');
    grunt.loadNpmTasks('grunt-angular-templates');

    grunt.registerTask('default', [
        'clean:pre',
        'useminPrepare',
        'concat:generated',
        'cssmin:generated',
        'uglify:generated',
        'clean:post',
        'copy:app2temp',
        'usemin',
        'copy:temp2build',
        'copy:app2build'
        //'copy:build2staged',
        ////'replace:index'
        //'htmlmin'
    ]);

    grunt.registerTask('install', [
        'clean:installSrc',
        'copy:staged2install'
    ]);

    grunt.registerTask('deploy', [
        //'copy:staged2dropbox'
        //'ftp-deploy'
    ]);

};
