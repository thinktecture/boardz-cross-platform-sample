// Contains all electron related tasks

'use strict';

var gulp = require('gulp'),
    del = require('del'),
    runSequence = require('run-sequence'),
    watch = require('gulp-watch'),
    electron = require('gulp-awesome-electron'),
    symdest = require('gulp-symdest'),
    path = require('path'),
    config = require('../gulp.config');

gulp.task('electron:clean', function () {
    return del([
        path.join(config.targets.electronFolder, 'www'),
        path.join(config.targets.electronFolder, 'build')
    ]);
});

gulp.task('electron:copy-source', function () {
    return gulp.src(path.join(config.targets.buildFolder, '**', '*.*'))
        .pipe(gulp.dest(path.join(config.targets.electronFolder, 'www')));
});

function buildAppFor(targetPlatform, target) {
    return gulp.src([
            path.join(config.targets.electronFolder, 'package.json'),
            path.join(config.targets.electronFolder, 'index.js'),
            path.join(config.targets.electronFolder, 'www', '**', '*')
    ])
        .pipe(electron({
            version: '0.36.7',
            platform: targetPlatform,
            arch: 'x64',
            companyName: 'Thinktecture AG',
            darwinIcon: path.join(config.targets.resourcesFolder, 'icon.icns'),
            winIcon: path.join(config.targets.resourcesFolder, 'icon.ico')
        }))
        .pipe(symdest(path.join(config.targets.electronFolder, 'build', target)));
}

gulp.task('electron:build:windows', function () {
    return buildAppFor('win32', 'windows');
});

gulp.task('electron:build:osx', function () {
    return buildAppFor('darwin', 'osx');
});

gulp.task('electron:build:linux', function () {
    return buildAppFor('linux', 'linux');
});

gulp.task('electron:build', function (done) {
    runSequence(
        'electron:build:windows',
        'electron:build:osx',
        'electron:build:linux',
        done
    )
});

gulp.task('electron:watch', function () {
    gulp.start('dev:livereload');

    runSequence('electron:default', function () {
        watch(config.targets.buildFolder, { base: config.targets.buildFolder })
            .pipe(gulp.dest(path.join(config.targets.electronFolder, 'www')));
    });
});

gulp.task('electron:default', function (done) {
    runSequence(
        'electron:clean',
        'dist:default',
        'electron:copy-source',
        'electron:build',
        done
    );
});

gulp.task('electron:release', function (done) {
    runSequence(
        'electron:clean',
        'dist:release',
        'electron:copy-source',
        'electron:build',
        done
    );
});
