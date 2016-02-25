// main gulpfile

(function () {
    'use strict';

    var config = require('./gulp.config'),
        gulp = require('gulp'),
        del = require('del'),
        runSequence = require('run-sequence'),
        gulptasks = require('require-dir')('./gulpTasks');


    for (var gulpTask in gulptasks) {
        gulptasks[gulpTask].init(gulp, config);
    }

    gulp.task('default', function (done) {
        return runSequence(
            'build-web', done
        );
    });

    gulp.task('clean', function (done) {
        del(config.targets.buildFolder + '/**/*', { force: true })
            .then(function () {
                done();
            });
    });

    gulp.task('build-all', function (done) {
        return runSequence(
            'build-web',
            [
                'build-electron',
                'build-cordova',
            ]
            , done
        );
    });

})();