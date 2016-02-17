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
                componentCss: [
                    'app/**/*.css'
                ],
                assets: [
                    'assets/**/*.*'
                ]
            },
            template: [
                './node_modules/rdash-ui/dist/**/*.*',
                './node_modules/bootstrap/dist/+(css|fonts)/*.*',
                './node_modules/font-awesome/+(css|fonts)/*.*'
            ],
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
        stylesFolder: 'css',
        minified: {
            js: 'app.js',
            css: 'app.css',
            templateCache: 'ng-templates.js'
        }
    }
};
