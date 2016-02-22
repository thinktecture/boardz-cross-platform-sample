// Contains everything to develop BoardZ! using a live reload server

'use strict';

var gulp = require('gulp'),
    buildConfig = require('../gulp.config'),
    del = require('del'),
    path = require('path'),
    runSequence = require('run-sequence'),
    server = require('gulp-server-livereload'),
    watch = require('gulp-watch'),
    cssmin = require('gulp-minify-css'),
    filelog = require('gulp-filelog'),
    concat = require('gulp-concat'),
    ts = require('gulp-typescript'),
    tsConfig = ts.createProject(buildConfig.ts.config),
    sourcemaps = require('gulp-sourcemaps'),
    inject = require('gulp-inject'),
    uglify = require('gulp-uglify'),
    utils = require('./utils.js');

function mapFiles(files, baseFolder) {
    return files.map(function (file) {
        return path.join(baseFolder, file);
    });
}

gulp.task('dev:clean', function (done) {
    del(buildConfig.targets.buildFolder + '/**/*', { force: true })
        .then(function () {
            done();
        });
});

gulp.task('dev:copy-template', function() {
    var sources = gulp.src(buildConfig.source.files.injectables);

    return gulp.src(mapFiles(buildConfig.source.files.main, buildConfig.source.folder))
        .pipe(inject(sources, {addRootSlash:false, ignorePath: buildConfig.targets.buildFolder}))
        .pipe(gulp.dest(path.join(buildConfig.targets.buildFolder)));
});

gulp.task('dev:copy-vendor-scripts', function() {
    return gulp.src(buildConfig.source.files.script_dependencies)
        .pipe(concat(buildConfig.targets.vendorMinJs))
    //    .pipe(uglify())
        .pipe(gulp.dest(path.join(buildConfig.targets.buildFolder, 'scripts/')));
});

gulp.task('private:copy-shim', function(){
    // es6shim cant be bundled with angular-polyfills see https://github.com/angular/angular/issues/6706
    return gulp.src(buildConfig.source.files.shim)
       .pipe(uglify())
        .pipe(gulp.dest(path.join(buildConfig.targets.buildFolder, 'scripts/')))
});


gulp.task('dev:copy-fonts', function(){
    return gulp.src(buildConfig.source.files.vendorFonts)
        .pipe(gulp.dest(path.join(buildConfig.targets.buildFolder, 'fonts')));
})
gulp.task('dev:copy-app-assets', function() {
    return gulp.src(mapFiles(buildConfig.source.files.app.assets, buildConfig.source.folder))
        .pipe(gulp.dest(path.join(buildConfig.targets.buildFolder, buildConfig.targets.appFolder)));
});

gulp.task('dev:vendor-css', function(){
    return gulp.src(buildConfig.source.files.vendorStylesheets)
        .pipe(concat(buildConfig.targets.vendorMinCss))
        .pipe(cssmin())
        .pipe(gulp.dest(path.join(buildConfig.targets.buildFolder, buildConfig.targets.stylesFolder)));

});

gulp.task('dev:copy-app-styles', function() {
    return gulp.src(mapFiles(buildConfig.source.files.app.css, buildConfig.source.folder))
        .pipe(cssmin())
        .pipe(gulp.dest(path.join(buildConfig.targets.buildFolder, buildConfig.targets.stylesFolder)));
});

gulp.task('dev:copy-component-styles', function() {
    return gulp.src(mapFiles(buildConfig.source.files.app.componentCss, buildConfig.source.folder))
        .pipe(cssmin())
        .pipe(gulp.dest(path.join(buildConfig.targets.buildFolder, buildConfig.targets.appFolder)));
});


gulp.task('dev:copy-app-html', function() {
    return gulp.src(mapFiles(buildConfig.source.files.app.html, buildConfig.source.folder))
        .pipe(gulp.dest(path.join(buildConfig.targets.buildFolder, buildConfig.targets.appFolder)));
});

gulp.task('dev:build', function() {
    return gulp.src(mapFiles(buildConfig.source.files.app.ts, buildConfig.source.folder))
        .pipe(sourcemaps.init())
        .pipe(ts(tsConfig))
        .pipe(sourcemaps.write('.', {
            includeContent: false,
            sourceRoot: '/src/BoardZ/app/'
        }))
        .pipe(gulp.dest(path.join(buildConfig.targets.buildFolder, buildConfig.targets.appFolder)));
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
        function() { done(); }
    );
});

gulp.task('dev:start-live-server', function () {
    return gulp.src(buildConfig.targets.buildFolder)
        .pipe(server({
            livereload: true,
            open: false
        }));
});


gulp.task('dev:watch', ['dev:default', 'dev:start-live-server'], function () {
    gulp.watch(mapFiles(buildConfig.source.files.app.html, buildConfig.source.folder), ['dev:copy-app-html']);
    gulp.watch(mapFiles(buildConfig.source.files.app.ts, buildConfig.source.folder), ['dev:build']);
});
