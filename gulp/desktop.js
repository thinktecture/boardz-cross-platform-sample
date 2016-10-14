const config = require('./config'),
    path = require('path'),
    fs = require('fs'),
    gulp = require('gulp'),
    run = require('run-sequence'),
    del = require('del'),
    electron = require('gulp-awesome-electron'),
    symdest = require('gulp-symdest'),
    shell = require('shelljs');


// public tasks

gulp.task('dist-desktop-all', function(){
    run(
        'dist-web',
        'desktop:clean',
        [
            'desktop:build:copy-sources',
            'desktop:build:copy-electron-sources'
        ],
        'desktop:build:all',
        done
    )
});

gulp.task('build-desktop-all', (done) => {
    run(
        'build-web',
        'desktop:clean',
        [
            'desktop:build:copy-sources',
            'desktop:build:copy-electron-sources'
        ],
        'desktop:build:all',
        done
    )
});

gulp.task('build-desktop-osx', (done) => {
    run(
        'build-web',
        'desktop:clean',
        [
            'desktop:build:copy-sources',
            'desktop:build:copy-electron-sources'
        ],
        'desktop:build:osx',
        done
    )
});

gulp.task('build-desktop-win', (done) => {
    run(
        'build-web',
        'desktop:clean',
        [
            'desktop:build:copy-sources',
            'desktop:build:copy-electron-sources'
        ],
        'desktop:build:win',
        done
    )
});

gulp.task('build-desktop-linux', (done) => {
    run(
        'build-web',
        'desktop:clean',
        [
            'desktop:build:copy-sources',
            'desktop:build:copy-electron-sources'
        ],
        'desktop:build:linux',
        done
    )
});

/**
 *  Start electron and load content from localhost (for development)
 */
gulp.task('start-desktop', (done) => {
    run(
        'desktop:clean',
        [
            'desktop:build:copy-sources',
            'desktop:build:copy-electron-sources'
        ],
        'start-electron-with-browser-sync',
        done)
});

gulp.task('start-electron-with-browser-sync', (done) => {
    shell.exec('node_modules/.bin/electron build/desktop/web --browsersync', { async: true });
    done();
});

// private tasks

gulp.task('desktop:clean', () => del(path.join(config.targets.build.desktop, '**/*')));

gulp.task('desktop:build:all', (done) => {
    run(
        [
            'desktop:build:osx',
            'desktop:build:win',
            'desktop:build:linux'
        ],
        done
    )
});

gulp.task('desktop:build:osx', () => {
    return buildAppFor('darwin', 'osx');
});

gulp.task('desktop:build:win', () => {
    return buildAppFor('win32', 'windows');
});

gulp.task('desktop:build:linux', () => {
    return buildAppFor('linux', 'linux');
});

gulp.task('desktop:build:copy-sources', () => {
    return gulp.src(path.join(config.targets.build.web, '**/*'))
        .pipe(gulp.dest(config.targets.build.desktopWeb));
});

gulp.task('desktop:build:copy-electron-sources', () => {
    return gulp.src(config.sources.electronFiles)
        .pipe(gulp.dest(config.targets.build.desktopWeb));
});


function buildAppFor(targetPlatform, target) {
    return gulp.src(path.join(config.targets.build.desktopWeb, '**', '*'))
        .pipe(electron({
            version: '1.3.2',
            platform: targetPlatform,
            arch: 'x64',
            companyName: 'Thinktecture AG',
            linuxExecutableName: 'BoardZ',
            darwinIcon: path.join(config.sources.resources, 'icon.icns'),
            winIcon: path.join(config.sources.resources, 'icon.ico')
        }))
        .pipe(symdest(path.join(config.targets.build.desktopBuild, target)));
}
