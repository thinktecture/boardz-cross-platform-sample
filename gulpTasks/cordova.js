// Contains all cordova related tasks

'use strict';

// Require dist tasks
require('./dist');

var gulp = require('gulp'),
    del = require('del'),
    sh = require('shelljs'),
    runSequence = require('run-sequence'),
    watch = require('gulp-watch'),
    server = require('gulp-server-livereload'),
    path = require('path'),
    tap = require('gulp-tap'),
    buildConfig = require('../gulp.config');

gulp.task('cordova:clean', function (done) {
    del([
        path.join(buildConfig.targets.cordovaFolder, 'www')
    ])
        .then(function () {
            done();
        });
});

gulp.task('cordova:copy-source', function () {
    return gulp.src(path.join(buildConfig.targets.distFolder, '**', '*.*'))
        .pipe(gulp.dest(path.join(buildConfig.targets.cordovaFolder, 'www')));
});

gulp.task('cordova:start-live-server:ios', function () {
    gulp.src(path.join(buildConfig.targets.cordovaFolder, 'platforms', 'ios', 'www'))
        .pipe(server({
            livereload: true,
            open: false
        }));
});

gulp.task('cordova:watch:ios', function () {
    gulp.start('dev:watch');
    runSequence('cordova:default', 'cordova:start-live-server:ios',  function () {
        watch(buildConfig.targets.buildFolder, { base: buildConfig.targets.buildFolder })
            .pipe(gulp.dest(path.join(buildConfig.targets.cordovaFolder, 'www')))
            .pipe(tap(function () {
                sh.cd(buildConfig.targets.cordovaFolder);
                sh.exec('cordova prepare');
                sh.cd('..');
            }));
    });
});

// TODO: Use Gulp Cordova?
gulp.task('cordova:build', function (done) {
    sh.cd(buildConfig.targets.cordovaFolder);
    sh.exec('cp -r "' + path.join('..', buildConfig.targets.resourcesFolder) + '" resources/');
    sh.exec('ionic resources');
    sh.exec('cordova prepare');
    sh.exec('cordova build');
    sh.cd('..');
    done();
});

gulp.task('cordova:default', function (done) {
    runSequence(
        'cordova:clean',
        'dist:default',
        'cordova:copy-source',
        'cordova:build',
        done
    );
});

gulp.task('cordova:release', function (done) {
    runSequence(
        'cordova:clean',
        'dist:release',
        'cordova:copy-source',
        'cordova:build',
        done
    );
});
