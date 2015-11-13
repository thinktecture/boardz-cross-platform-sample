// Contains all electron related tasks

'use strict';

// Require dist tasks
require('./dist');

var gulp = require('gulp'),
    del = require('del'),
    runSequence = require('run-sequence'),
    electronPackager = require('electron-packager'),
    watch = require('gulp-watch'),
    path = require('path'),
    buildConfig = require('../gulp.config');

gulp.task('electron:clean', function (done) {
    del([
        path.join(buildConfig.targets.electronFolder, 'www')
    ])
        .then(function () {
            done();
        });
});

gulp.task('electron:copy-source', function () {
    return gulp.src(path.join(buildConfig.targets.distFolder, '**', '*.*'))
        .pipe(gulp.dest(path.join(buildConfig.targets.electronFolder, 'www')));
});

gulp.task('electron:build', function () {
    var opts = {
        dir: buildConfig.targets.electronFolder,
        out: 'electron-build',
        name: 'BoardZ',
        platform: 'win32,darwin',
        arch: 'x64',
        version: '0.34.3',
        overwrite: true
    };
    electronPackager(opts, function done (err, appPath) {

    });
});

gulp.task('electron:watch', function () {
    gulp.start('dev:livereload');
    runSequence('electron:default', function () {
        watch(buildConfig.targets.buildFolder, { base: buildConfig.targets.buildFolder })
            .pipe(gulp.dest(path.join(buildConfig.targets.electronFolder, 'www')));
    });
});

gulp.task('electron:default', function (done) {
    runSequence(
        'electron:clean',
        'dist:default',
        'electron:copy-source',
        'electron:build',
        done
    );
});

gulp.task('electron:release', function (done) {
    runSequence(
        'electron:clean',
        'dist:release',
        'electron:copy-source',
        'electron:build',
        done
    );
});
