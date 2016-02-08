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
    del([
        buildConfig.targets.buildFolder
    ])
        .then(function () {
            done();
        });
});

gulp.task('dev:copy-dependencies', function() {
    gulp.src(buildConfig.source.files.dependencies, {base: './node_modules'})
        .pipe(gulp.dest(path.join(buildConfig.targets.buildFolder, 'node_modules/')));
});

gulp.task('dev:copy-html', function() {
    gulp.src(mapFiles(buildConfig.source.files.app.html, buildConfig.source.folder))
        .pipe(gulp.dest(buildConfig.targets.buildFolder));
});

gulp.task('dev:build', function() {
    gulp.src(mapFiles(buildConfig.source.files.app.ts, buildConfig.source.folder))
        .pipe(sourcemaps.init())
        .pipe(ts(tsConfig))
        .pipe(sourcemaps.write('.', {
            includeContent: false,
            sourceRoot: '../src/BoardZ/app/'
        }))
        .pipe(gulp.dest(path.join(buildConfig.targets.buildFolder, buildConfig.targets.tsOutputFolder)));
});

gulp.task('dev:default', function (done) {
    runSequence('dev:clean',
        'dev:copy-html',
        'dev:copy-dependencies',
        'dev:build',
   /*
        'dev:copy-source',
        'dev:copy-assets',
        'dev:inject',
   */
        done);
});

gulp.task('dev:start-live-server', function () {

    gulp.src(buildConfig.targets.buildFolder)
        .pipe(server({
            livereload: false,
            open: false
        }));
});


gulp.task('dev:livereload', function () {

    runSequence('dev:default');
    gulp.watch(mapFiles(buildConfig.source.files.app.html, buildConfig.source.folder), ['dev:copy-html']);
    gulp.watch(mapFiles(buildConfig.source.files.app.ts, buildConfig.source.folder), ['dev:build']);

    gulp.src('./build')
        .pipe(server({
            livereload: true,
            open: false
        }));
});
