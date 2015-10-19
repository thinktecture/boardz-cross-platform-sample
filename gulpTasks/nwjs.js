// Contains all cordova related tasks

'use strict';

// Require dist tasks
require('./dist');

var gulp = require('gulp'),
    del = require('del'),
    runSequence = require('run-sequence'),
    NwBuilder = require('nw-builder'),
    watch = require('gulp-watch'),
    path = require('path'),
    buildConfig = require('../gulp.config');

gulp.task('nwjs:clean', function (done) {
    del([
        path.join(buildConfig.targets.nwjsFolder, 'www'),
        path.join(buildConfig.targets.nwjsFolder, 'build')
    ])
        .then(function () {
            done();
        });
});

gulp.task('nwjs:copy-source', function () {
    return gulp.src(path.join(buildConfig.targets.distFolder, '**', '*.*'))
        .pipe(gulp.dest(path.join(buildConfig.targets.nwjsFolder, 'www')));
});

gulp.task('nwjs:build', function () {
    var nw = new NwBuilder({
        version: '0.12.3',
        files: path.join(buildConfig.targets.nwjsFolder, '**', '*.*'),
        buildDir: path.join(buildConfig.targets.nwjsFolder, 'build'),
        //winIco: "./app/resources/icon.png",
        macIcns: path.join(buildConfig.targets.resourcesFolder, 'icon.icns'),
        platforms: ['win32', 'win64', 'osx64', 'linux32', 'linux64']
    });

    return nw.build();
});

gulp.task('nwjs:watch', function () {
    gulp.start('dev:livereload');
    runSequence('nwjs:default', function () {
        watch(buildConfig.targets.buildFolder, { base: buildConfig.targets.buildFolder })
            .pipe(gulp.dest(path.join(buildConfig.targets.nwjsFolder, 'www')));
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
