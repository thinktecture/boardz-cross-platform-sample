// Contains everything to develop BoardZ! using a live reload server

'use strict';

var gulp = require('gulp'),
    del = require('del'),
    buildConfig = require('../gulp.config'),
    path = require('path'),
    inject = require('gulp-inject'),
    watch = require('gulp-watch'),
    server = require('gulp-server-livereload'),
    runSequence = require('run-sequence'),
    utils = require('./utils.js');

gulp.task('dev:clean', function (done) {
    del([
        buildConfig.targets.buildFolder
    ])
        .then(function () {
            done();
        });
});

gulp.task('dev:copy-assets', function () {
    return utils.getAssets(buildConfig.source.folder)
        .pipe(gulp.dest(buildConfig.targets.buildFolder));
});

gulp.task('dev:copy-source', function () {
    return utils.getSources(buildConfig.source.folder)
        .pipe(gulp.dest(buildConfig.targets.buildFolder));
});

gulp.task('dev:inject', function () {
    var injectables = utils.getSources(buildConfig.targets.buildFolder, false);

    return gulp.src(path.join(buildConfig.source.folder, buildConfig.source.index))
        .pipe(inject(injectables, {
            ignorePath: buildConfig.targets.buildFolder,
            addRootSlash: false
        }))
        .pipe(gulp.dest(buildConfig.targets.buildFolder));
});

gulp.task('dev:default', function (done) {
    runSequence('dev:clean',
        'dev:copy-source',
        'dev:copy-assets',
        'dev:inject',
        done);
});

gulp.task('dev:start-live-server', function () {
    gulp.src(buildConfig.targets.buildFolder)
        .pipe(server({
            livereload: true,
            open: false
        }));
});

gulp.task('dev:livereload', function () {
    runSequence('dev:default', 'dev:start-live-server', function () {
        deltaWatch();
    });
});

gulp.task('dev:watch', function () {
    runSequence('dev:default', function () {
        deltaWatch();
    });
});

function deltaWatch() {
    watch(buildConfig.source.folder, { base: buildConfig.source.folder }, function (vinyl) {
        if (vinyl.event && (vinyl.event === 'add' || vinyl.event === 'unlink' || vinyl.path.indexOf('index.html') > -1)) {
            gulp.start('dev:inject');
        }
    })
        .pipe(gulp.dest(buildConfig.targets.buildFolder));
}
