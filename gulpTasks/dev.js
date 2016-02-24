// Contains everything to develop BoardZ! using a live reload server

'use strict';

var gulp = require('gulp'),
    config = require('../gulp.config'),
    del = require('del'),
    path = require('path'),
    runSequence = require('run-sequence'),
    server = require('gulp-server-livereload'),
    watch = require('gulp-watch'),
    cssmin = require('gulp-minify-css'),
    filelog = require('gulp-filelog'),
    concat = require('gulp-concat'),
    ts = require('gulp-typescript'),
    tsConfig = ts.createProject(config.ts.config),
    sourcemaps = require('gulp-sourcemaps'),
    inject = require('gulp-inject'),
    uglify = require('gulp-uglify');


gulp.task('dev:clean', function (done) {
    del(config.targets.buildFolder + '/**/*', { force: true })
        .then(function () {
            done();
        });
});

gulp.task('dev:copy-template', function () {
    var sources = gulp.src(config.source.files.injectables);

    return gulp.src(config.source.files.main)
        .pipe(inject(sources, { addRootSlash: false, ignorePath: config.targets.buildFolder }))
        .pipe(gulp.dest(path.join(config.targets.buildFolder)));
});

gulp.task('dev:copy-vendor-scripts', function () {
    return gulp.src(config.source.files.script_dependencies)
        .pipe(concat(config.targets.vendorMinJs))
        //    .pipe(uglify())
        .pipe(gulp.dest(path.join(config.targets.buildFolder, 'scripts/')));
});

gulp.task('private:copy-shim', function () {
    // es6shim cant be bundled with angular-polyfills see https://github.com/angular/angular/issues/6706
    return gulp.src(config.source.files.shim)
        .pipe(uglify())
        .pipe(gulp.dest(path.join(config.targets.buildFolder, 'scripts/')))
});

gulp.task('dev:copy-fonts', function () {
    return gulp.src(config.source.files.vendorFonts)
        .pipe(gulp.dest(path.join(config.targets.buildFolder, 'fonts')));
});

gulp.task('dev:copy-app-assets', function () {
    return gulp.src(config.source.files.app.assets)
        .pipe(gulp.dest(path.join(config.targets.buildFolder, config.targets.appFolder)));
});

gulp.task('dev:vendor-css', function () {
    return gulp.src(config.source.files.vendorStylesheets)
        .pipe(concat(config.targets.vendorMinCss))
        .pipe(cssmin())
        .pipe(gulp.dest(path.join(config.targets.buildFolder, config.targets.stylesFolder)));
});

gulp.task('dev:copy-app-styles', function () {
    return gulp.src(config.source.files.app.css)
        .pipe(cssmin())
        .pipe(gulp.dest(path.join(config.targets.buildFolder, config.targets.stylesFolder)));
});

gulp.task('dev:copy-component-styles', function () {
    return gulp.src(config.source.files.app.componentCss)
        .pipe(cssmin())
        .pipe(gulp.dest(path.join(config.targets.buildFolder, config.targets.appFolder)));
});


gulp.task('dev:copy-app-html', function () {
    return gulp.src(config.source.files.app.html)
        .pipe(gulp.dest(path.join(config.targets.buildFolder, config.targets.appFolder)));
});

gulp.task('dev:build', function () {
    return gulp.src(config.source.files.app.ts)
        .pipe(sourcemaps.init())
        .pipe(ts(tsConfig))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(config.targets.buildFolder, config.targets.appFolder)));
});

gulp.task('dev:default', ['dev:clean'], function (done) {
    return runSequence(
        ['dev:copy-vendor-scripts',
            'private:copy-shim',
            'dev:build',
            'dev:vendor-css',
            'dev:copy-fonts',
            'dev:copy-app-html',
            'dev:copy-app-styles',
            'dev:copy-component-styles',
            'dev:copy-app-assets'],
        'dev:copy-template',
        done
    );
});

gulp.task('dev:start-live-server', function () {
    return gulp.src(config.targets.buildFolder)
        .pipe(server({
            livereload: true,
            open: false
        }));
});


gulp.task('dev:watch', ['dev:default', 'dev:start-live-server'], function () {
    gulp.watch(config.source.files.app.html, ['dev:copy-app-html']);
    gulp.watch(config.source.files.app.ts, ['dev:build']);
});
