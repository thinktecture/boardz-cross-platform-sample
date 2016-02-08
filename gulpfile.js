'use strict';

require('./gulpTasks/dev');

var gulp = require('gulp'),
    runSequence = require('run-sequence');



gulp.task('watch', ['dev:watch']);
