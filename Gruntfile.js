"use strict";

module.exports = function(grunt) {
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-browser-sync");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-postcss");
    grunt.loadNpmTasks("grunt-csso");
    grunt.loadNpmTasks("grunt-contrib-imagemin");
    grunt.loadNpmTasks("grunt-contrib-copy");

    require("load-grunt-tasks")(grunt);

    grunt.initConfig({
        less: {
            style: {
                files: {
                    "build/css/style.css": "source/less/style.less"
                }
            }
        },

        postcss: {
          style: {
            options: {
              processors: [
                require("autoprefixer")()
              ]
            },
            src: "build/css/*.css"
          }
        },

        browserSync: {
            server: {
                bsFiles: {
                    src: [ "build/*.html", "build/css/*.css" ]
                },
                options: {
                    server: "build/",
                    watchTask: true,
                    notify: false,
                    open: true,
                    cors: true,
                    ui: false
                }
            }
        },

        watch: {
            style: {
                files: ["bui/less/**/*.less"],
                tasks: ["less", "postcss", "csso"]
            }
        },

        csso: {
            style: {
                options: {
                    report: "gzip"
                },
                files: {
                    "build/css/style.min.css": ["build/css/style.css"]
                }
            }
        },

        imagemin: {
            images: {
                options: {
                    optimizationLevel: 3,
                    progressive: true
                },
                files: [{
                    expand: true,
                    src: ["source/img/**/*.{png,jpg,svg}"]
                }]
            }
        },

        cwebp: {
            mages: {
                options: {
                    q: 90
                },
                files: [{
                    expand: true,
                    src: ["source/img/**/*.{png,jpg}"]
                }]
            }
        },

        copy: {
          build: {
            files: [{
              expand: true,
              cwd: "source",
              src: [
                "fonts/**/*.{woff,woff2}",
                "img/**",
                "js/**",
                "*.html"
              ],
              dest: "build"
            }]
          }
        },

        clean: {
            build: ["build"]
        }
    });

    grunt.registerTask("serve", ["browserSync", "watch"]);

    grunt.registerTask("build", [
        "clean",
        "copy",
        "less",
        "postcss",
        "csso"
    ]);
};
