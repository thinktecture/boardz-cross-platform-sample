'use strict';

module.exports = {
    source: {
        folder: './src/BoardZ/',
        index: 'index.html',
        files: {
            app: {
                ts: [
                    'app/**/*.ts'
                ],
                html: [
                    'index.html',
                    'app/**/*.html'
                ],
                css: [
                    'css/**/*.css'
                ],
                assets: [
                    'assets/**/*.*'
                ]
            },
            dependencies: [
                './node_modules/es6-shim/es6-shim.min.js',
                './node_modules/systemjs/dist/system-polyfills.js',
                './node_modules/angular2/bundles/angular2-polyfills.js',
                './node_modules/systemjs/dist/system.src.js',
                './node_modules/rxjs/**/*.js',
                './node_modules/angular2/bundles/angular2.dev.js',
                './node_modules/angular2/bundles/http.dev.js',
                './node_modules/angular2/bundles/router.dev.js'
            ]
        }
    },
    ts: {
        config: 'tsconfig.json'
    },
    targets: {
        buildFolder: './build',
        tsOutputFolder: 'app/',
        minified: {
            js: 'app.js',
            css: 'app.css',
            templateCache: 'ng-templates.js'
        }
    }
};
