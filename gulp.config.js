'use strict';

module.exports = {
    assetFolder: 'assetFiles/',
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
                    'css/**/*.css'
                ],
                assets: [
                    'assets/**/*.*'
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
                    'vendor/**/!(*.js|*.css)'
                ]
            }
        }
    },
    targets: {
        buildFolder: 'build/',
        distFolder: 'dist/',
        tempFolder: '.temp/',
        cordovaFolder: 'cordova/',
        assetsFolder: 'assets/',
        nwjsFolder: 'nwjs/',
        resourcesFolder: 'resources/',
        minified: {
            js: 'app.js',
            css: 'app.css',
            templateCache: 'ng-templates.js'
        }
    },
    angularModuleName: 'xplatform-sample'
};
