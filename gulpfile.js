"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var babel = require("gulp-babel");
var uglify = require("gulp-uglify");
var htmlmin = require("gulp-htmlmin");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthmtl = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");
var server = require("browser-sync").create();

gulp.task("css", function () {
  return gulp
    .src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("js", function () {
  return gulp
    .src(["source/js/**/*.js", "!source/js/**/*.min.js"])
    .pipe(plumber())
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("build/js"));
});

gulp.task("images", function () {
  return gulp
    .src("source/img/**/*.{png,jpg,svg}")
    .pipe(
      imagemin([imagemin.jpegtran({ progressive: true }), imagemin.svgo({})])
    )
    .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function () {
  return gulp
    .src("build/img/**/*.{png,jpg}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("build/img"));
});

gulp.task("sprite", function () {
  return gulp
    .src("source/img/{icon-*,logo-htmlacademy,logo-footer}.svg")
    .pipe(
      imagemin([
        imagemin.svgo({
          plugins: [{ removeAttrs: { attrs: ["fill"] } }]
        })
      ])
    )
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("html", function () {
  return gulp
    .src("source/*.html")
    .pipe(posthmtl([include()]))
    .pipe(htmlmin({
      collapseWhitespace: true,
      collapseBooleanAttributes: true
    }))
    .pipe(gulp.dest("build"));
});

gulp.task("copy", function () {
  return gulp
    .src(["source/fonts/**/*.{woff,woff2}", "source/img/**", "source/*.ico", "source/js/**/*.min.js"], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("server", function () {
  server.init({
    server: "build",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch(
    "source/img/{bg-*,icon-*,logo-htmlacademy,logo-footer}.svg",
    gulp.series("sprite", "html", "refresh")
  );
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task(
  "build",
  gulp.series("clean", "copy", "images", "webp", "css", "sprite", "js", "html")
);
gulp.task("start", gulp.series("build", "server"));
