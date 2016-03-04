// Contains all electron related tasks

(function () {
    'use strict';

    function RegisterTasks(gulp, config) {
        var del = require('del'),
            runSequence = require('run-sequence'),
            watch = require('gulp-watch'),
            electron = require('gulp-atom-electron'),
            symdest = require('gulp-symdest'),
            path = require('path');

        gulp.task('[private-electron]:clean', function () {
            return del([
                path.join(config.targets.electronFolder, 'www'),
                path.join(config.targets.electronFolder, 'build')
            ]);
        });

        gulp.task('[private-electron]:copy-source', function () {
            return gulp.src(path.join(config.targets.buildFolder, '**', '*.*'))
                .pipe(gulp.dest(path.join(config.targets.electronFolder, 'www')));
        });

        gulp.task('[private-electron]:copy-electron-source', function () {
            return gulp.src(path.join(config.source.files.electronFiles))
                .pipe(gulp.dest(path.join(config.targets.electronFolder, 'www')));
        });

        function buildAppFor(targetPlatform, target) {
            return gulp.src(path.join(config.targets.electronFolder, 'www', '**', '*'))
                .pipe(electron({
                    version: '0.36.8',
                    platform: targetPlatform,
                    arch: 'x64',
                    companyName: 'Thinktecture AG',
                    linuxExecutableName: 'BoardZ',
                    darwinIcon: path.join(config.targets.resourcesFolder, 'icon.icns'),
                    winIcon: path.join(config.targets.resourcesFolder, 'icon.ico')
                }))
                .pipe(symdest(path.join(config.targets.electronFolder, 'build', target)));
        }

        gulp.task('[private-electron]:build-windows', function () {
            return buildAppFor('win32', 'windows');
        });

        gulp.task('[private-electron]:build-osx', function () {
            return buildAppFor('darwin', 'osx');
        });

        gulp.task('[private-electron]:build-linux', function () {
            return buildAppFor('linux', 'linux');
        });

        gulp.task('[private-electron]:build-apps', function (done) {
            runSequence(
                '[private-electron]:build-windows',
                '[private-electron]:build-osx',
                '[private-electron]:build-linux',
                done
            )
        });

        gulp.task('build-electron', function (done) {
            runSequence(
                '[private-electron]:clean',
                [
                    '[private-electron]:copy-electron-source',
                    '[private-electron]:copy-source'
                ],
                '[private-electron]:build-apps',
                done
            );
        });

        gulp.task('build-electron-windows', function (done) {
            runSequence(
                '[private-electron]:clean',
                [
                    '[private-electron]:copy-electron-source',
                    '[private-electron]:copy-source'
                ],
                '[private-electron]:build-windows',
                done
            );
        });

        gulp.task('build-electron-osx', function (done) {
            runSequence(
                '[private-electron-osx]:clean',
                [
                    '[private-electron]:copy-electron-source',
                    '[private-electron]:copy-source'
                ],
                '[private-electron]:build-osx',
                done
            );
        });

        gulp.task('build-electron-linux', function (done) {
            runSequence(
                '[private-electron-osx]:clean',
                [
                    '[private-electron]:copy-electron-source',
                    '[private-electron]:copy-source'
                ],
                '[private-electron]:build-linux',
                done
            );
        });
    }

    module.exports = {
        init: RegisterTasks
    };
})();
