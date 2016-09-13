const gulp = require('gulp'),
    run = require('run-sequence');

gulp.task('start-demo', (done) => {
    run(
        'build-web',
        [
            'start-desktop', 'start-mobile-ios', 'watch-web'
        ]
        , done);
});
