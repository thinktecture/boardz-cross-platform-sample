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
        path.join(buildConfig.targets.cordovaFolder, 'www'),
        path.join(buildConfig.targets.cordovaFolder, 'platforms'),
        path.join(buildConfig.targets.cordovaFolder, 'plugins')
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
    sh.exec('cordova platform add ios');
    sh.exec('cordova platform add android');
    sh.exec('cordova platform add windows');
    sh.exec('ionic resources');
    sh.exec('cordova plugin add cordova-plugin-statusbar');
    sh.exec('cordova plugin add cordova-plugin-geolocation');
    sh.exec('cordova plugin add cordova-plugin-camera');
    sh.exec('cordova plugin add cordova-plugin-crosswalk-webview');
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