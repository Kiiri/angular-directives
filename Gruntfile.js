/* @author Alex Dong (https://github.com/Kiiri) */

module.exports = function(grunt) {
    [
        "grunt-angular-templates",
        "grunt-contrib-copy",
        "grunt-contrib-cssmin",
        "grunt-contrib-jshint",
        "grunt-contrib-sass",
        "grunt-contrib-uglify",
        "grunt-contrib-watch"
    ].forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        copy: {
            icons: {
                files: [{
                    src: "icons/**",
                    dest: "build/",
                    filter: "isFile",
                    expand: true
                }]
            }
        },
        cssmin: {
            options: {
                banner: "/*! <%= pkg.name %>: Built on <%= grunt.template.today('yyyy-mm-dd') %> */\n",
                roundingPrecision: -1,
                shorthandCompacting: false
            },
            target: {
                files: {
                    "build/kiiri-angular-directives.min.css": ["src/*.css", "src/**/*.css"]
                }
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
                    console: true,
                    exports: true,
                    jQuery: true,
                    module: true,
                    $: true,
                    qrcode: true,
                    moment: true
                }
            },
            with_overrides: {
                options: {
                    curly: false,
                    undef: true,
                },
                files: {
                    src: ["src/**/*.js", "!src/qrcode-scanner/*.min.js", "!src/image-input/*.min.js", "!src/image-input/canvas-toBlob.js", "!src/scrollbar/jquery.mCustomScrollbar.concat.min.js", "!src/timepicker/moment.js", "!src/draggable/jquery-ui-draggable.min.js", "!src/datepicker/jquery-ui-datepicker.min.js"]
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
                    src: ["src/*.scss", "src/**/*.scss"],
                    ext: ".css"
                }]
            }
        },
        uglify: {
            options: {
                banner: "/*! <%= pkg.name %>: Built on <%= grunt.template.today('yyyy-mm-dd') %> */\n"
            },
            js: {
                src: ["src/**/*.js", "build/kiiri-templates.js"],
                dest: "build/kiiri-angular-directives.min.js"
            }
        },
        watch: {
            scripts: {
                files: ["src/**/*.js"],
                tasks: ["jshint", "uglify", "copy"]
            },
            styles: {
                files: ["src/*.scss", "src/**/*.scss"],
                tasks: ["sass", "cssmin", "copy"]
            },
            templates: {
                files: ["src/**/*.tpl.html"],
                tasks: ["ngtemplates", "uglify", "copy"]
            }
        }
    });

    grunt.registerTask("default", ["sass", "cssmin", "jshint", "ngtemplates", "uglify", "copy"]);
    grunt.registerTask("build", "default");
};

