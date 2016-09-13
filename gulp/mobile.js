const config = require('./config'),
    path = require('path'),
    fs = require('fs'),
    gulp = require('gulp'),
    run = require('run-sequence'),
    del = require('del'),
    sh = require('shelljs'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    count = require('gulp-count');


// public tasks

gulp.task('build-mobile-ios', (done) => {
    run(
        'mobile:clean',
        'mobile:build:copy-sources',
        'mobile:build:remove-fake-script',
        'mobile:build:copy-dev-config',
        'mobile:build:resources',
        'mobile:build:ios',
        done
    )
});

gulp.task('start-mobile-ios', ['build-mobile-ios'], (done) => {
    var currentDir = sh.pwd();
    sh.cd(config.targets.build.mobile);
    sh.exec('cordova run ios');
    sh.cd(currentDir);
    done();
});

// private tasks

gulp.task('mobile:clean', () => del(path.join(config.targets.build.mobile, '**/*')));

gulp.task('mobile:build:copy-sources', () => {
    let files = gulp.src(path.join(config.targets.build.web, '**', '*.*'), { base: config.targets.build.web })
    return copySources(files);
});

function copySources(files) {
    return files
        .pipe(gulp.dest(path.join(config.targets.build.mobileWeb)))
        .on('end', () => {
            var currentDir = sh.pwd();
            sh.cd(path.join(__dirname, '..', config.targets.build.mobile));
            sh.exec('cordova prepare ios');
            sh.cd(currentDir);
            browserSync.reload();
        })
        .pipe(count('Copied ## files to Cordova www folder'));
}


gulp.task('mobile:build:copy-dev-config', () => {
    return gulp.src(config.sources.cordova.devConfig)
        .pipe(rename('config.xml'))
        .pipe(gulp.dest(config.targets.build.mobile));
});

gulp.task('mobile:build:ios', (done) => {
    var currentDir = sh.pwd();
    sh.cd(config.targets.build.mobile);
    sh.exec('cordova prepare ios');
    sh.exec('../../node_modules/.bin/cordova-splash');
    sh.exec('../../node_modules/.bin/cordova-icon');
    sh.exec('cordova build ios');
    sh.cd(currentDir);
    done();
});

gulp.task('mobile:build:resources', () => {
    return gulp.src(path.join(config.sources.resources, '*.png'))
        .pipe(gulp.dest(config.targets.build.mobile));
});

gulp.task('mobile:build:remove-fake-script', () => {
    return del(path.join(config.targets.build.mobile, 'www', 'cordova.js'));
});
