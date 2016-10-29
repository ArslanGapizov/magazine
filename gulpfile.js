"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var mqpacker = require("css-mqpacker");
var minify = require("gulp-clean-css");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var svgstore = require("gulp-svgstore");
var svgmin = require("gulp-svgmin");
var server = require("browser-sync");
var run = require("run-sequence");
var del = require("del");
var ghPages = require('gulp-gh-pages');

gulp.task("style", function() {
   gulp.src("sass/style.scss")
   .pipe(plumber())
   .pipe(sass())
   .pipe(postcss([
     autoprefixer({browsers: [
       "last 1 version",
       "last 2 Chrome versions",
       "last 2 Firefox versions",
       "last 2 Opera versions",
       "last 2 Edge versions"
     ]}),
     mqpacker({
       sort: false
     })
   ]))
   .pipe(gulp.dest("build/css"))/*build*/
   .pipe(minify())
   .pipe(rename("style.min.css"))
   .pipe(gulp.dest("build/css"))/*build*/
   .pipe(server.reload({stream: true}));
});

gulp.task("images", function() {
    return gulp.src("build/img/**/*.{png,jpg,gif}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("symbols", function() {
    return gulp.src("img/icons/*.svg")
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("serve",["style"], function() {
   server.init({
       server: "build"/*build*/
   });

    gulp.watch("sass/**/*.scss", ["style"]);
    gulp.watch("*.html").on("change", server.reload);
});

gulp.task("clean", function() {
    return del("build");
});

gulp.task("copy", function() {
    return gulp.src([
      "fonts/**/*.{woff,woff2,otf}",
      "img/**",
      "js/**",
      "*.html"
    ], {
      base: "."
    })
    .pipe(gulp.dest("build"));
});

gulp.task("build", function(fn) {
  run("clean", "copy", "style", "images", "symbols", fn);
})

gulp.task('deploy', function() {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});
