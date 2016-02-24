// Contains all nw.js related tasks

'use strict';

var gulp = require('gulp'),
    del = require('del'),
    runSequence = require('run-sequence'),
    NwBuilder = require('nw-builder'),
    watch = require('gulp-watch'),
    path = require('path'),
    config = require('../gulp.config');

gulp.task('nwjs:clean', function () {
    return del([
        path.join(config.targets.nwjsFolder, 'www'),
        path.join(config.targets.nwjsFolder, 'build')
    ]);
});

gulp.task('nwjs:copy-source', function () {
    return gulp.src(path.join(config.targets.buildFolder, '**', '*.*'))
        .pipe(gulp.dest(path.join(config.targets.nwjsFolder, 'www')));
});

gulp.task('nwjs:build', function () {
    var nw = new NwBuilder({
        version: '0.12.3',
        files: path.join(config.targets.nwjsFolder, '**', '*.*'),
        buildDir: path.join(config.targets.nwjsFolder, 'build'),
        winIco: path.join(config.targets.resourcesFolder, 'icon.ico'),
        macIcns: path.join(config.targets.resourcesFolder, 'icon.icns'),
        platforms: ['win32', 'win64', 'osx64', 'linux32', 'linux64'],
        zip: false
    });

    return nw.build();
});

gulp.task('nwjs:watch', function () {
    gulp.start('dev:livereload');
    runSequence('nwjs:default', function () {
        watch(config.targets.buildFolder, { base: config.targets.buildFolder })
            .pipe(gulp.dest(path.join(config.targets.nwjsFolder, 'www')));
    });
});

gulp.task('nwjs:default', function (done) {
    runSequence(
        'nwjs:clean',
        'dist:default',
        'nwjs:copy-source',
        'nwjs:build',
        done
    );
});

gulp.task('nwjs:release', function (done) {
    runSequence(
        'nwjs:clean',
        'dist:release',
        'nwjs:copy-source',
        'nwjs:build',
        done
    );
});
