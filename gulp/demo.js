const gulp = require('gulp'),
    run = require('run-sequence');

gulp.task('watch-all', (done) => {
    run(
        'build-web',
        'build-mobile-ios',
        [
            'start-desktop', 'start-mobile-ios', 'watch-web'
        ]
        , done);
});
