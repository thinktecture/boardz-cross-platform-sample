'use strict';

require('./gulpTasks/dev');
require('./gulpTasks/dist');
require('./gulpTasks/cordova');
require('./gulpTasks/nwjs');

var gulp = require('gulp'),
    runSequence = require('run-sequence');

gulp.task('build:all:release', function (done) {
    runSequence(
        'dist:release',
        'cordova:clean',
        'cordova:copy-source',
        'cordova:build',
        'nwjs:clean',
        'nwjs:copy-source',
        'nwjs:build',
        done
    );
});

gulp.task('build:all', function (done) {
    runSequence(
        'dist:default',
        'cordova:clean',
        'cordova:copy-source',
        'cordova:build',
        'nwjs:clean',
        'nwjs:copy-source',
        'nwjs:build',
        done
    );
});

gulp.task('default', ['build:all:release']);

gulp.task('watch', ['dev:watch']);