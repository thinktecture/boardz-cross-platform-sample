'use strict';

module.exports = {
    source: {
        folder: './src/BoardZ/',
        files: {
            injectables: [
                './build/scripts/vendor.min.js',
                './build/css/vendor.min.css'
            ],
            main: [
                'index.html'
            ],
            app: {
                ts: [
                    'app/**/*.ts'
                ],
                html: [
                    'app/**/*.html'
                ],
                css: [

                    'css/**/*.css'
                ],
                componentCss: [
                    'app/**/*.css'
                ],
                assets: [
                    'assets/**/*.*'
                ]
            },
            vendorStylesheets:[
                './src/BoardZ/vendor/bootstrap/css/bootstrap.css',
                './src/BoardZ/vendor/admin-lte/css/AdminLTE.css',
                './src/BoardZ/vendor/admin-lte/css/skins/_all-skins.css',
                './src/BoardZ/vendor/font-awesome/css/font-awesome.css'
            ],
            vendorFonts:[
                './src/BoardZ/vendor/font-awesome/fonts/*.*',
                './src/BoardZ/vendor/bootstrap/fonts/*.*'
            ],
            script_dependencies: [
                './src/BoardZ/vendor/hammerjs/hammer.js',
                './src/BoardZ/vendor/jquery/jquery-2.1.4.js',
                './src/BoardZ/vendor/jquery/jquery.hammer.js',
                './src/BoardZ/vendor/bootstrap/js/bootstrap.js',
                './src/BoardZ/vendor/fastclick/fastclick.js',
                './src/BoardZ/vendor/admin-lte/js/app.js',
                './node_modules/es6-shim/s6-shim.js',
                './node_modules/systemjs/dist/system-polyfills.js',
                './node_modules/angular2/bundles/angular2-polyfills.js',
                './node_modules/systemjs/dist/system.js',
                './node_modules/rxjs/bundles/rx.min.js',
                './node_modules/angular2/bundles/angular2.js',
                './node_modules/angular2/bundles/http.js',
                './node_modules/angular2/bundles/router.js'
            ]
        }
    },
    ts: {
        config: 'tsconfig.json'
    },
    targets: {
        vendorMinJs: 'vendor.min.js',
        vendorMinCss: 'vendor.min.css',
        buildFolder: 'build',
        appFolder: 'app',
        stylesFolder: 'css',
        minified: {
            js: 'app.js',
            css: 'app.css',
            templateCache: 'ng-templates.js'
        }
    }
};
