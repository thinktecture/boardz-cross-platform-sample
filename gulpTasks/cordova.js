// Contains all cordova related tasks

'use strict';

// Require dist tasks
require('./dist');

var gulp = require('gulp'),
    del = require('del'),
    sh = require('shelljs'),
    runSequence = require('run-sequence'),
    path = require('path'),
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
