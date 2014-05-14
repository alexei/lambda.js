module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        uglify: {
            options: {
                banner: "/*! <%= pkg.name %> | <%= pkg.author %> | <%= pkg.license %> */\n",
                sourceMap: true
            },
            build: {
                src: "src/datastore.js",
                dest: "dist/datastore.min.js"
            }
        },

        watch: {
            js: {
                files: "src/*.js",
                tasks: ["uglify"]
            }
        }
    })

    grunt.loadNpmTasks("grunt-contrib-uglify")
    grunt.loadNpmTasks("grunt-contrib-watch")

    grunt.registerTask("default", ["uglify", "watch"])
}
