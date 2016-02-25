'use strict';

var config = require('./gulp.config'),
    gulp = require('gulp'),
    runSequence = require('run-sequence'),
    gulptasks = require('require-dir')('./gulpTasks');


for (var gulpTask in gulptasks) {
    gulptasks[gulpTask].init(gulp, config);
}

gulp.task('default', function (done) {
    return runSequence(
        'dev:default', done
    );
});

gulp.task('build-all', function (done) {
    return runSequence(
        'dev:default',
        [
            'electron:default',
            'cordova:default',
        ]
        , done
    );
});