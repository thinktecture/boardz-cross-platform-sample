// Contains all cordova related tasks
'use strict';

var gulp = require('gulp'),
    del = require('del'),
    sh = require('shelljs'),
    runSequence = require('run-sequence'),
    watch = require('gulp-watch'),
    server = require('gulp-server-livereload'),
    path = require('path'),
    tap = require('gulp-tap'),
    rename = require('gulp-rename'),
    config = require('../gulp.config');

gulp.task('cordova:clean', function () {
    return del([
        path.join(config.targets.cordovaFolder, 'hooks'),
        path.join(config.targets.cordovaFolder, 'platforms'),
        path.join(config.targets.cordovaFolder, 'plugins'),
        path.join(config.targets.cordovaFolder, 'resources'),
        path.join(config.targets.cordovaFolder, 'www')
    ]);
});

gulp.task('cordova:config-for-livereload', function () {
    gulp.src(path.join(config.assetFolder, 'config_livereload.xml'), { base: config.assetFolder })
        .pipe(rename('config.xml'))
        .pipe(gulp.dest(config.targets.cordovaFolder));
});

gulp.task('cordova:config-for-default', function () {
    gulp.src(path.join(config.assetFolder, 'config.xml'), { base: config.assetFolder })
        .pipe(gulp.dest(config.targets.cordovaFolder));
});

gulp.task('cordova:copy-source', function () {
    return gulp.src(path.join(config.targets.buildFolder, '**', '*.*'))
        .pipe(gulp.dest(path.join(config.targets.cordovaFolder, 'www')));
});

gulp.task('cordova:start-live-server:ios', function () {
    gulp.src(path.join(config.targets.cordovaFolder, 'platforms', 'ios', 'www'))
        .pipe(server({
            livereload: true,
            open: false
        }));
});

gulp.task('cordova:watch:ios', function () {
    // gulp.start('dev:watch');
    runSequence('cordova:clean',
        'dist:default',
        'cordova:copy-source',
        'cordova:config-for-livereload',
        'cordova:build:ios',
        'cordova:start-live-server:ios',
        function () {
            watch(config.source.folder, { base: config.source.folder })
                .pipe(gulp.dest(path.join(config.targets.cordovaFolder, 'www')))
                .pipe(tap(function () {
                    sh.cd(config.targets.cordovaFolder);
                    sh.exec('cordova prepare ios');
                    sh.cd('..');
                }));
        });
});

gulp.task('cordova:build:ios', function (done) {
    sh.cd(config.targets.cordovaFolder);
    sh.exec('cordova prepare ios');
    sh.exec('ionic resources');
    sh.exec('cordova build ios');
    sh.cd('..');
    done();
});

gulp.task('cordova:build:all', function (done) {
    sh.cd(config.targets.cordovaFolder);
    sh.exec('cordova prepare');
    sh.exec('ionic resources');
    sh.exec('cordova build');
    sh.cd('..');
    done();
});

gulp.task('cordova:prepare:resources', function () {
    return gulp.src(path.join(config.targets.resourcesFolder, '*.*'))
        .pipe(gulp.dest(path.join(config.targets.cordovaFolder, 'resources')));
});

gulp.task('cordova:default:ios', function (done) {
    runSequence(
        'cordova:clean',
        'dist:default',
        'cordova:copy-source',
        'cordova:config-for-default',
        'cordova:prepare:resources',
        'cordova:build:ios',
        done
    );
});

gulp.task('cordova:default', function (done) {
    runSequence(
        'cordova:clean',
        'dist:default',
        'cordova:copy-source',
        'cordova:config-for-default',
        'cordova:prepare:resources',
        'cordova:build:all',
        done
    );
});

gulp.task('cordova:release', function (done) {
    runSequence(
        'cordova:clean',
        'dist:release',
        'cordova:copy-source',
        'cordova:config-for-default',
        'cordova:prepare:resources',
        'cordova:build:all',
        done
    );
});
