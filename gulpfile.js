'use strict';

var gulp = require('gulp'),
    del = require('del'),
    sh = require('shelljs'),
    NwBuilder = require('nw-builder');

gulp.task('clean', function (done) {
    del(['app/cordova/www', 'app/cordova/platforms', 'app/cordova/plugins', 'app/nwjs/www'])
        .then(function () {
            done();
        });
});

gulp.task('copy-source', ['clean'], function () {
    return gulp.src([
        'app/**/*.*',
        '!app/cordova/**/*.*',
        '!app/nwjs/**/*.*'
    ])
        .pipe(gulp.dest('app/cordova/www'))
        .pipe(gulp.dest('app/nwjs/www'));
});

gulp.task('build:cordova', ['clean', 'copy-source'], function (done) {
    sh.cd('app/cordova');
    sh.exec('cordova platform add ios');
    sh.exec('cordova platform add android');
    sh.exec('cordova platform add windows');
    sh.exec('cordova plugin add org.apache.cordova.statusbar');
    sh.exec('cordova plugin add cordova-plugin-geolocation');
    sh.exec('cordova plugin add cordova-plugin-camera');
    sh.exec('cordova build');
    done();
});

gulp.task('build:nwjs', ['clean', 'copy-source'], function () {
    var nw = new NwBuilder({
        version: '0.12.3',
        files: './app/nwjs/**/**',
        platforms: ['win32', 'win64', 'osx32', 'osx64', 'linux32', 'linux64']
    });

    return nw.build();
});

gulp.task('default', ['clean', 'copy-source', 'build:cordova']);