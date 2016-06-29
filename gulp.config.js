'use strict';

module.exports = {
    systemJsConfig: './system.config.js',
    source: {
        folder: './src/BoardZ/',
        files: {
            injectables: [
                './dist/www/scripts/vendor.min.js',
                './dist/www/scripts/system.min.js',
                './dist/www/scripts/system.setup.js',
                './dist/www/css/vendor.min.css',
                './dist/www/css/app.css',
                './dist/www/scripts/shim.min.js',
                './dist/www/scripts/zone.js',
                './dist/www/scripts/reflect.js'
            ],
            electronFiles: './electron/**/*.*',
            cordovaFiles: './cordova/',
            cordova: './src/BoardZ/cordova.js',
            main: [
                './src/BoardZ/index.html'
            ],
            systemSetupScript: './src/BoardZ/system.setup.js',
            app: {
                everything: ['./src/BoardZ/app/**/*', './src/BoardZ/system.setup.js'],
                ts: [
                    './src/BoardZ/app/**/*.ts'
                ],
                html: [
                    './src/BoardZ/app/**/*.html'
                ],
                css: [

                    './src/BoardZ/css/**/*.css'
                ],
                componentCss: [
                    './src/BoardZ/app/**/*.css'
                ],
                assets: [
                    './src/BoardZ/assets/**/*.*'
                ]
            },
            vendorStylesheets: [
                './src/BoardZ/vendor/bootstrap/css/bootstrap.css',
                './src/BoardZ/vendor/admin-lte/css/AdminLTE.css',
                './src/BoardZ/vendor/admin-lte/css/skins/_all-skins.css',
                './src/BoardZ/vendor/font-awesome/css/font-awesome.css',
                './src/BoardZ/vendor/pNotify/pnotify.custom.css',
                './src/BoardZ/vendor/leaflet-js/leaflet.css'
            ],
            vendorFonts: [
                './src/BoardZ/vendor/font-awesome/fonts/*.*',
                './src/BoardZ/vendor/bootstrap/fonts/*.*'
            ],
            shim: [
                './node_modules/es6-shim/es6-shim.min.js',
                './node_modules/angular2/es6/dev/src/testing/shims_for_IE.js'
            ],
            vendorJs: [
                './src/BoardZ/vendor/hammerjs/hammer.js',
                './src/BoardZ/vendor/jquery/jquery-2.1.4.js',
                './src/BoardZ/vendor/jquery/jquery.hammer.js',
                './src/BoardZ/vendor/jquery/jquery.slimscroll.js',
                './src/BoardZ/vendor/pNotify/pnotify-adapter.js',
                './src/BoardZ/vendor/pNotify/pnotify.custom.js',
                './src/BoardZ/vendor/signalr/signalr.js',
                './src/BoardZ/vendor/bootstrap/js/bootstrap.js',
                './src/BoardZ/vendor/fastclick/fastclick.js',
                './src/BoardZ/vendor/admin-lte/js/app.js',
                './src/BoardZ/vendor/leaflet-js/leaflet-src.js'

            ],
            angular2rc1deps: [
                './node_modules/core-js/client/shim.min.js',
                './node_modules/zone.js/dist/zone.js',
                './node_modules/reflect-metadata/reflect.js'
            ],
            angular2: './node_modules/@angular/**/*',
            rxjs: './node_modules/rxjs/**/*',
            systemJs: './node_modules/systemjs/dist/system.src.js'
        }
    },
    ts: {
        config: './tsconfig.json'
    },
    targets: {
        systemMinJs: 'system.min.js',
        vendorMinJs: 'vendor.min.js',
        vendorMinCss: 'vendor.min.css',
        buildFolder: './dist/www',
        electronFolder: './dist/desktop',
        cordovaFolder: './dist/mobile',
        resourcesFolder: './resources/',
        hooksFolder: './cordova/hooks/',
        appFolder: 'app',
        stylesFolder: 'css',
        minified: {
            js: 'app.js',
            css: 'app.css',
            templateCache: 'ng-templates.js'
        }
    }
};
