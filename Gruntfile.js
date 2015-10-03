/* @author Alex Dong (https://github.com/Kiiri) */

module.exports = function(grunt) {
    [
        "grunt-angular-templates",
        "grunt-contrib-concat",
        "grunt-contrib-jshint",
        "grunt-contrib-sass",
        "grunt-contrib-uglify"
    ].forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        concat: {
            options: {
                banner: "/*! <%= pkg.name %>: Built on <%= grunt.template.today('yyyy-mm-dd') %> */\n",
            },
            css: {
                src: ["src/**/*.css"],
                dest: "build/kiiri-angular-directives.min.css"
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                globals: {
                    angular: true,
                    jQuery: true,
                    $: true
                },
            },
            with_overrides: {
                options: {
                    curly: false,
                    undef: true,
                },
                files: {
                    src: ["src/**/*.js"]
                },
            }
        },
        ngtemplates:  {
            "kiiri.angular": {
                src: "src/**/*.tpl.html",
                dest: "build/kiiri-templates.js",
                options: {
                    htmlmin: {
                        collapseWhitespace: true,
                        collapseBooleanAttributes: true
                    }
                }
            }
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    src: "src/**/*.scss",
                    ext: ".css"
                }]
            }
        },
        uglify: {
            options: {
                banner: "/*! <%= pkg.name %>: Built on <%= grunt.template.today('yyyy-mm-dd') %> */\n"
            },
            build: {
                src: ["src/**/*.js", "build/kiiri-templates.js"],
                dest: "build/kiiri-angular-directives.min.js"
            }
        }
    });

    grunt.registerTask("default", ["sass", "concat", "jshint", "ngtemplates", 'uglify']);
    grunt.registerTask("build", 'default');
};

