
module.exports = function(grunt) {
    [
        "grunt-contrib-jshint",
        "grunt-contrib-uglify"
    ].forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
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
        uglify: {
            options: {
                banner: "/*! <%= pkg.name %>: Built on <%= grunt.template.today("yyyy-mm-dd") %> */\n"
            },
            build: {
                src: ["src/main.js", "src/directives/**/*.js"],
                dest: "build/kiiri-angular-directives.min.js"
            }
        }
    });

    grunt.registerTask("default", ["jshint", 'uglify']);
    grunt.registerTask("build", 'default');
};

