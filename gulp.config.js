'use strict';

module.exports = {
    source: {
        folder: 'src/BoardZ/',
        index: 'index.html',
        files: {
            app: {
                js: [
                    'app/init.js',
                    'app/**/*.js',
                    'common/**/*.js'
                ],
                html: [
                    'app/**/*.html'
                ],
                css: [
                    'assets/**/*.*'
                ],
                assets: [
                    'app/**/*.json'
                ]
            },
            vendor: {
                js: [
                    'vendor/winstore-jscompat/*.js',
                    'vendor/jquery/*.js',
                    'vendor/angular-js/angular.js',
                    'vendor/angular-translate/angular-translate.js',
                    'vendor/three-js/three.js',
                    'vendor/**/*.js'
                ],
                css: [
                    'vendor/**/*.css',
                    'vendor/bootstrap/**/bootstrap.css',
                    'vendor/admin-lte/**/*.css'
                ],
                assets: [
                    '!vendor/**/*.css',
                    '!vendor/**/*.js',
                    'vendor/**/*.*'
                ]
            }
        }
    },
    targets: {
        buildFolder: 'build/',
        distFolder: 'dist/',
        cordovaFolder: 'cordova/',
        nwjsFolder: 'nwjs/'
    }
};