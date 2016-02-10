'use strict';

module.exports = {
    source: {
        folder: './src/BoardZ/',
        files: {
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
                assets: [
                    'assets/**/*.*'
                ]
            },
            template: ['./node_modules/rdash-ui/dist/**/*.*'],
            script_dependencies: [
                './node_modules/es6-shim/es6-shim.*',
                './node_modules/systemjs/dist/*.*',
                './node_modules/rxjs/**/*.js',
                './node_modules/angular2/bundles/**/*',
            ]
        }
    },
    ts: {
        config: 'tsconfig.json'
    },
    targets: {
        buildFolder: './build',
        appFolder: 'app',
        minified: {
            js: 'app.js',
            css: 'app.css',
            templateCache: 'ng-templates.js'
        }
    }
};
