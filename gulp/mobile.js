const config = require('./config'),
    path = require('path'),
    fs = require('fs'),
    gulp = require('gulp'),
    run = require('run-sequence'),
    del = require('del'),
    sh = require('shelljs'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    count = require('gulp-count'),
    replace = require('gulp-replace'),
    os = require('os');

// public tasks

gulp.task('build-mobile-ios', (done) => {
    buildMobileApp('ios', done);
});

gulp.task('build-mobile-android', (done) => {
    buildMobileApp('android', done);
});

gulp.task('build-mobile-windows', (done) => {
    buildMobileApp('windows', done);
});

gulp.task('start-mobile-ios', (done) => {
    runMobileApp('ios', done);
});

gulp.task('start-mobile-android', (done) => {
    runMobileApp('android', done);
});

gulp.task('start-mobile-windows', (done) => {
    runMobileApp('windows', done);
});

gulp.task('dist-mobile-all', (done) => {
    run('dist-mobile-ios', 'dist-mobile-android', done);
});

gulp.task('dist-mobile-ios', (done) => {
    distributeMobileApp('ios', done)
});

gulp.task('dist-mobile-android', (done) => {
    distributeMobileApp('android', done)
});

gulp.task('dist-mobile-windows', (done) => {
    distributeMobileApp('windows', done);
});

gulp.task('build-splash-and-icon', (done) => {
    var currentDir = sh.pwd();
    sh.cd(config.targets.build.mobile);
    sh.exec('../../node_modules/.bin/cordova-splash');
    sh.exec('../../node_modules/.bin/cordova-icon');
    sh.cd(currentDir);
    done();
});

gulp.task('mobile:build:all', (done) => {
    run(
        'build-web',
        'mobile:clean',
        'mobile:build:copy-dist-config',
        'mobile:build:copy-sources',
        'mobile:build:remove-fake-script',
        'mobile:build:resources',
        'mobile:build:copy:hooks',
        'build-splash-and-icon',
        ['mobile:build:ios', 'mobile:build:android', 'mobile:build:windows'],
        done);
});


// private tasks

function buildMobileApp(platform, done) {
    run(
        'mobile:clean',
        'mobile:build:copy-dev-config',
        'mobile:build:copy-sources',
        'mobile:build:remove-fake-script',

        'mobile:build:resources',
        'mobile:build:copy:hooks',
        'mobile:build:' + platform,
        done
    )
}

function distributeMobileApp(platform, done) {
    run(
        'mobile:clean',
        'mobile:build:copy-dist-config',
        'mobile:build:copy-sources-'+ platform,
        'mobile:build:remove-fake-script',
        'mobile:build:resources',
        'mobile:build:copy:hooks',
        'build-splash-and-icon',
        'mobile:build:' + platform,
        done
    )
}

gulp.task('mobile:clean', () => del(path.join(config.targets.build.mobile, '**/*')));

gulp.task('mobile:build:copy-sources', () => {
    let files = gulp.src(path.join(config.targets.build.web, '**', '*.*'), { base: config.targets.build.web });
    return copySources(files, '');
});

gulp.task('mobile:build:copy-sources-ios', () => {
    let files = gulp.src(path.join(config.targets.build.web, '**', '*.*'), { base: config.targets.build.web });
    return copySources(files, 'ios');
});

gulp.task('mobile:build:copy-sources-android', () => {
    let files = gulp.src(path.join(config.targets.build.web, '**', '*.*'), { base: config.targets.build.web });
    return copySources(files, 'android');
});

gulp.task('mobile:build:copy-sources-windows', () => {
    let files = gulp.src(path.join(config.targets.build.web, '**', '*.*'), { base: config.targets.build.web });
    return copySources(files, 'windows');
});

function copySources(files, platform) {
    var currentDir = sh.pwd();
    return files
        .pipe(gulp.dest(path.join(config.targets.build.mobileWeb)))
        .on('end', () => {
            sh.cd(path.join(__dirname, '..', config.targets.build.mobile));
            sh.exec('cordova prepare ' + platform);
            sh.cd(currentDir);
            browserSync.reload();
        })
        .pipe(count('Copied ## files to Cordova www folder'));
}

gulp.task('mobile:build:copy-dev-config', () => {
    let hostname = os.hostname();
    return gulp.src(config.sources.cordova.devConfig)
        .pipe(rename('config.xml'))
        .pipe(replace('${hostname}', hostname))
        .pipe(gulp.dest(config.targets.build.mobile));
});

gulp.task('mobile:build:copy-dist-config', () => {
    return gulp.src(config.sources.cordova.config)
        .pipe(gulp.dest(config.targets.build.mobile));
});

gulp.task('mobile:build:ios', (done) => {
    prepareAndBuildNativeProject('ios', done);
});

gulp.task('mobile:build:android', (done) => {
    prepareAndBuildNativeProject('android', done);
});

gulp.task('mobile:build:windows', (done) => {
    prepareAndBuildNativeProject('windows', done);
});

function prepareAndBuildNativeProject(platform, done) {
    var currentDir = sh.pwd();
    sh.cd(config.targets.build.mobile);
    sh.exec('cordova prepare ' + platform);
    sh.exec('cordova build ' + platform);
    sh.cd(currentDir);
    done();
}

function runMobileApp(platform, done) {
    var currentDir = sh.pwd();
    console.log(config.targets.build.mobile);
    sh.cd(config.targets.build.mobile);
    sh.exec('cordova run ' + platform);
    sh.cd(currentDir);
    done();
}

gulp.task('mobile:build:resources', () => {
    return gulp.src(path.join(config.sources.resources, '*.png'))
        .pipe(gulp.dest(config.targets.build.mobile));
});

gulp.task('mobile:build:remove-fake-script', () => {
    return del(path.join(config.targets.build.mobile, 'www', 'cordova.js'));
});

gulp.task('mobile:build:copy:hooks', () => {
    return gulp.src(config.sources.cordova.hooks)
        .pipe(gulp.dest(config.targets.build.mobileHooks));
});
