// Contains all Cordova-related tasks

(function () {
    'use strict';

    function RegisterTasks(gulp, config) {
        var del = require('del'),
            sh = require('shelljs'),
            runSequence = require('run-sequence'),
            watch = require('gulp-watch'),
            batch = require('gulp-batch'),
            server = require('gulp-server-livereload'),
            path = require('path'),
            tap = require('gulp-tap'),
            rename = require('gulp-rename');

        gulp.task('[private-cordova]:clean', function () {
            return del([
                path.join(config.targets.cordovaFolder, 'hooks'),
                path.join(config.targets.cordovaFolder, 'platforms'),
                path.join(config.targets.cordovaFolder, 'plugins'),
                path.join(config.targets.cordovaFolder, 'resources'),
                path.join(config.targets.cordovaFolder, 'www')
            ], {force: true});
        });

        gulp.task('[private-cordova]:config-for-livereload', function () {
            gulp.src(path.join(config.source.files.cordovaFiles, 'config_livereload.xml'), {base: config.source.files.cordovaFiles})
                .pipe(rename('config.xml'))
                .pipe(gulp.dest(config.targets.cordovaFolder));
        });

        gulp.task('[private-cordova]:config-for-default', function () {
            gulp.src(path.join(config.source.files.cordovaFiles, 'config.xml'), {base: config.source.files.cordovaFiles})
                .pipe(gulp.dest(config.targets.cordovaFolder));
        });

        gulp.task('[private-cordova]:copy-source', function () {
            console.log('COPY-SOURCE', sh.pwd());
            return gulp.src(path.join(config.targets.buildFolder, '**', '*.*'))
                .pipe(gulp.dest(path.join(config.targets.cordovaFolder, 'www')));
        });

        gulp.task('[private-cordova]:start-live-server:ios', function () {
            return gulp.src(path.join(config.targets.cordovaFolder, 'platforms', 'ios', 'www'))
                .pipe(server({
                    livereload: true,
                    open: false
                }));
        });

        gulp.task('watch-cordova-ios', ['[private-cordova]:start-live-server:ios'], function () {
            runSequence('[private-cordova]:clean',
                '[private-cordova]:copy-source',
                '[private-cordova]:remove-fake-script',
                '[private-cordova]:config-for-livereload',
                '[private-cordova]:build:ios');

            watch(path.join(config.targets.buildFolder, '**', '*'), {base: config.targets.buildFolder}, batch(function (events, done) {
                runSequence('[private-cordova]:copy-source', function () {
                    var currentDir = sh.pwd();
                    sh.cd(path.join(__dirname, '..', config.targets.cordovaFolder));
                    sh.exec('cordova prepare ios');
                    sh.cd(currentDir);
                    done();
                });
            }));
        });

        gulp.task('[private-cordova]:build:ios', function (done) {
            var currentDir = sh.pwd();
            sh.cd(config.targets.cordovaFolder);
            sh.exec('cordova prepare ios');
            sh.exec('ionic resources');
            sh.exec('cordova build ios');
            sh.cd(currentDir);
            done();
        });

        gulp.task('[private-cordova]:build:android', function (done) {
            var currentDir = sh.pwd();
            sh.cd(config.targets.cordovaFolder);
            sh.exec('cordova prepare android');
            sh.exec('ionic resources');
            sh.exec('cordova build android');
            sh.cd(currentDir);
            done();
        });

        gulp.task('[private-cordova]:build:windows', function (done) {
            var currentDir = sh.pwd();
            sh.cd(config.targets.cordovaFolder);
            sh.exec('cordova prepare windows');
            sh.exec('ionic resources');
            sh.exec('cordova build windows');
            sh.cd(currentDir);
            done();
        });

        gulp.task('[private-cordova]:build:all', function (done) {
            var currentDir = sh.pwd();
            sh.cd(config.targets.cordovaFolder);
            sh.exec('cordova prepare');
            sh.exec('ionic resources');
            sh.exec('cordova build');
            sh.cd(currentDir);
            done();
        });

        gulp.task('[private-cordova]:copy:resources', function () {
            return gulp.src(path.join(config.targets.resourcesFolder, '*.*'))
                .pipe(gulp.dest(path.join(config.targets.cordovaFolder, 'resources')));
        });

        gulp.task('[private-cordova]:default:ios', function (done) {
            runSequence(
                '[private-cordova]:clean',
                '[private-cordova]:copy-source',
                '[private-cordova]:remove-fake-script',
                '[private-cordova]:config-for-default',
                '[private-cordova]:copy:resources',
                '[private-cordova]:build:ios',
                done
            );
        });

        gulp.task('[private-cordova]:remove-fake-script', function () {
            return del(path.join(config.targets.cordovaFolder, 'www', 'cordova.js'));
        });

        gulp.task('[private-cordova]:build-only', function (done) {
            var currentDir = sh.pwd();
            sh.cd(config.targets.cordovaFolder);
            sh.exec('cordova build ios');
            sh.cd(currentDir);
            done();
        });

        gulp.task('rebuild-cordova', function (done) {
            runSequence('build-web', '[private-cordova]:copy-source', '[private-cordova]:remove-fake-script', '[private-cordova]:build-only', done);
        });

        gulp.task('build-cordova', function (done) {
            runSequence(
                'build-web',
                '[private-cordova]:clean',
                '[private-cordova]:copy-source',
                '[private-cordova]:remove-fake-script',
                '[private-cordova]:config-for-default',
                '[private-cordova]:copy:resources',
                '[private-cordova]:build:all',
                done
            );
        });

        gulp.task('build-cordova-ios', function (done) {
            runSequence(
                'build-web',
                '[private-cordova]:clean',
                '[private-cordova]:copy-source',
                '[private-cordova]:remove-fake-script',
                '[private-cordova]:config-for-default',
                '[private-cordova]:copy:resources',
                '[private-cordova]:build:ios',
                done
            );
        });

        gulp.task('build-cordova-android', function (done) {
            runSequence(
                'build-web',
                '[private-cordova]:clean',
                '[private-cordova]:copy-source',
                '[private-cordova]:remove-fake-script',
                '[private-cordova]:config-for-default',
                '[private-cordova]:copy:resources',
                '[private-cordova]:build:android',
                done
            );
        });

        gulp.task('build-cordova-windows', function (done) {
            runSequence(
                'build-web',
                '[private-cordova]:clean',
                '[private-cordova]:copy-source',
                '[private-cordova]:remove-fake-script',
                '[private-cordova]:config-for-default',
                '[private-cordova]:copy:resources',
                '[private-cordova]:build:windows',
                done
            );
        });
    }

    module.exports = {
        init: RegisterTasks
    };
})();
