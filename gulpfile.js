'use strict';

require('./gulpTasks/dev');
require('./gulpTasks/dist');
require('./gulpTasks/cordova');
require('./gulpTasks/nwjs');
require('./gulpTasks/electron');

var gulp = require('gulp'),
    runSequence = require('run-sequence');

gulp.task('build:all:release', function (done) {
    runSequence(
        'dist:release',
        'cordova:clean',
        'cordova:copy-source',
        'cordova:build:all',
        'nwjs:clean',
        'nwjs:copy-source',
        'nwjs:build',
        'electron:clean',
        'electron:copy-source',
        'electron:build',
        done
    );
});

gulp.task('build:all', function (done) {
    runSequence(
        'dist:default',
        'cordova:clean',
        'cordova:copy-source',
        'cordova:build:all',
        'nwjs:clean',
        'nwjs:copy-source',
        'nwjs:build',
        'electron:clean',
        'electron:copy-source',
        'electron:build',
        done
    );
});

gulp.task('default', ['build:all:release']);

gulp.task('watch', ['dev:watch']);
