// Contains everything to develop BoardZ! using a live reload server

'use strict';

var gulp = require('gulp'),
    buildConfig = require('../gulp.config'),
    del = require('del'),
    path = require('path'),
    runSequence = require('run-sequence'),
    server = require('gulp-server-livereload'),
    watch = require('gulp-watch'),

    ts = require('gulp-typescript'),
    tsConfig = ts.createProject(buildConfig.ts.config),
    sourcemaps = require('gulp-sourcemaps'),

    inject = require('gulp-inject'),
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
    var files = mapFiles(buildConfig.source.files.main, buildConfig.source.folder);
    files = files.concat(buildConfig.source.files.template);

    return gulp.src(files)
        .pipe(gulp.dest(path.join(buildConfig.targets.buildFolder)));
});

gulp.task('dev:copy-script-dependencies', function() {
    return gulp.src(buildConfig.source.files.script_dependencies, { base: './node_modules' })
        .pipe(gulp.dest(path.join(buildConfig.targets.buildFolder, 'scripts/')));
});

gulp.task('dev:copy-app-assets', function() {
    return gulp.src(mapFiles(buildConfig.source.files.app.assets, buildConfig.source.folder))
        .pipe(gulp.dest(path.join(buildConfig.targets.buildFolder, buildConfig.targets.appFolder)));
});

gulp.task('dev:copy-app-styles', function() {
    return gulp.src(mapFiles(buildConfig.source.files.app.css, buildConfig.source.folder))
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
            sourceRoot: '../src/BoardZ/app/'
        }))
        .pipe(gulp.dest(path.join(buildConfig.targets.buildFolder, buildConfig.targets.appFolder)));
});

gulp.task('dev:default', ['dev:clean'], function (done) {
    return runSequence(
        'dev:copy-script-dependencies',
        'dev:build',
        'dev:copy-template',
        'dev:copy-app-html',
        'dev:copy-app-styles',
        'dev:copy-app-assets',
        function() { done(); }
    );
});

gulp.task('dev:start-live-server', function () {
    return gulp.src(buildConfig.targets.buildFolder)
        .pipe(server({
            livereload: false,
            open: false
        }));
});


gulp.task('dev:livereload', ['dev:default'], function () {
    gulp.watch(mapFiles(buildConfig.source.files.app.html, buildConfig.source.folder), ['dev:copy-app-html']);
    gulp.watch(mapFiles(buildConfig.source.files.app.ts, buildConfig.source.folder), ['dev:build']);

    return gulp.src(buildConfig.targets.buildFolder)
        .pipe(server({
            livereload: true,
            open: false
        }));
});
