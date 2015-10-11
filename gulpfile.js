'use strict';

require('./gulpTasks/dev');
require('./gulpTasks/dist');

/*
var gulp = require('gulp'),
    del = require('del'),
    sh = require('shelljs'),
    NwBuilder = require('nw-builder'),
    series = require('stream-series'),
    server = require('gulp-server-livereload'),
    path = require('path'),
    buildConfig = require('./build.config');

gulp.task('clean:cordova', function (done) {
    del([
        path.join(buildConfig.targets.cordovaFolder, 'www'),
        path.join(buildConfig.targets.cordovaFolder, 'platforms'),
        path.join(buildConfig.targets.cordovaFolder, 'plugins')
    ])
        .then(function () {
            done();
        });
});

gulp.task('clean:nwjs', function (done) {
    del([
        path.join(buildConfig.targets.nwjsFolder, 'www'),
        path.join(buildConfig.targets.nwjsFolder, 'build')
    ])
        .then(function () {
            done();
        });
});

function getSources() {
    return gulp.src([
        buildConfig.sourceFiles.vendor.js,
        buildConfig.sourceFiles.vendor.css,
        buildConfig.sourceFiles.app.js,
        buildConfig.sourceFiles.app.css
    ]);
}

gulp.task('copy-source:')

gulp.task('copy-source', ['clean:cordova', 'clean:nwjs'], function () {
    return gulp.src([
        'app/!**!/!*.*',
        '!app/cordova/!**!/!*.*',
        '!app/nwjs/!**!/!*.*'
    ])
        .pipe(gulp.dest('app/cordova/www'))
        .pipe(gulp.dest('app/nwjs/www'));
});

gulp.task('build:cordova', ['clean:cordova', 'copy-source'], function (done) {
    sh.cd('app/cordova');
    sh.exec('cp -r ../resources .');
    sh.exec('cordova platform add ios');
    sh.exec('cordova platform add android');
    sh.exec('cordova platform add windows');
    sh.exec('ionic resources');
    sh.exec('cordova plugin add org.apache.cordova.statusbar');
    sh.exec('cordova plugin add cordova-plugin-geolocation');
    sh.exec('cordova plugin add cordova-plugin-camera');
    sh.exec('cordova plugin add cordova-plugin-crosswalk-webview');
    sh.exec('cordova build');
    done();
});

gulp.task('build:nwjs', ['clean:nwjs', 'copy-source'], function () {
    var nw = new NwBuilder({
        version: '0.12.3',
        files: './app/nwjs/!**!/!**',
        buildDir: "./app/nwjs/build",
        //winIco: "./app/resources/icon.png",
        macIcns: "./app/resources/icon.icns",
        platforms: ['win32', 'win64', 'osx64', 'linux32', 'linux64']
    });

    return nw.build();
});

gulp.task('index:dev', function () {

});

gulp.task('watch', ['index:dev'], function () {
    gulp.watch([
        'app/!**!/!*.js'
    ], ['index:dev']);
    gulp.src('app')
        .pipe(server({
            livereload: true,
            open: true
        }));
});*/

//gulp.task('default', ['clean', 'copy-source', 'build:cordova']);
