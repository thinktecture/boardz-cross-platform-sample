// Contains all electron related tasks

'use strict';
function RegisterTasks(gulp, config) {
    var del = require('del'),
        runSequence = require('run-sequence'),
        watch = require('gulp-watch'),
        electron = require('gulp-atom-electron'),
        symdest = require('gulp-symdest'),
        path = require('path');

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

    gulp.task('electron:copy-electron-source', function () {
        return gulp.src(path.join(config.source.files.electron))
            .pipe(gulp.dest(path.join(config.targets.electronFolder, 'www')));
    });

    function buildAppFor(targetPlatform, target) {
        return gulp.src(path.join(config.targets.electronFolder, 'www', '**', '*'))
            .pipe(electron({
                version: '0.36.8',
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
            [
                'electron:copy-electron-source',
                'electron:copy-source'
            ],
            'electron:build',
            done
        );
    });

}

module.exports = {
    init: RegisterTasks
};