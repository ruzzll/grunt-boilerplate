module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            build: {
                files: {
                    'build/js/bundle.js': ['src/app/app.js']
                }
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                expand: true,
                cwd: 'build/',
                src: [ '**/*.js' ],
                dest: 'build',
                ext: '.js',
                extDot: 'first'
            }
        },

        copy: {
            build: {
                files: [ {
                    expand: true,
                    cwd: 'src/public/',
                    src: [ '**' ],
                    dest: 'build'
                } ]
            }
        },

        sass: {
            dist: {
                src: 'src/scss/app.scss',
                dest: 'build/css/app.css'
            }
        },

        clean: {
            build: [ 'build/**' ]
        },

        watch: {
            js: {
                files: ['src/app/**/*.js'],
                tasks: ['browserify']
            },
            sass: {
                files: ['src/scss/**/*.scss'],
                tasks: ['sass']
            },

            public: {
                files: ['src/public/**/*'],
                tasks: ['copy']
            },

            options: {
                livereload: true
            }
        },

        connect: {
            server: {
                options: {
                    livereload: true,
                    base: 'build',
                    port: 9009,
                    hostname: '*',
                    open: true
                }
            }
        }
    });

    // Load the plugins task.
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Task(s).
    grunt.registerTask('default', ['build']);
    grunt.registerTask('build', ['clean', 'copy', 'browserify', 'sass', 'uglify']);
    grunt.registerTask('start', ['clean', 'copy', 'browserify', 'sass', 'connect', 'watch']);
};