let config = {
    sources: {
        base: 'src/Boardz',
        baseModules: 'node_modules',
        scripts: ['src/Boardz/**/*.ts', 'typings/index.d.ts'],
        templates: ['src/Boardz/app/**/*.html'],
        styles: ['src/Boardz/css/**/*.css'],
        vendorStyles: [
            './src/BoardZ/vendor/bootstrap/css/bootstrap.css',
            './src/BoardZ/vendor/admin-lte/css/AdminLTE.css',
            './src/BoardZ/vendor/admin-lte/css/skins/_all-skins.css',
            './src/BoardZ/vendor/font-awesome/css/font-awesome.css',
            './src/BoardZ/vendor/pNotify/pnotify.custom.css',
            './src/BoardZ/vendor/leaflet-js/leaflet.css'
        ],
        assets: ['src/Boardz/assets/**/*'],
        indexHtml: 'src/Boardz/index.html',
        javaScripts: ['src/Boardz/cordova.js', 'src/Boardz/system.setup.js'],
        vendorScripts: [
            './node_modules/core-js/client/shim.min.js',
            './node_modules/zone.js/dist/zone.js',
            './node_modules/reflect-metadata/reflect.js',
            './node_modules/systemjs/dist/system.src.js',
            './src/BoardZ/foo.js',
            './src/BoardZ/vendor/hammerjs/hammer.js',
            './src/BoardZ/vendor/jquery/jquery-2.1.4.js',
            './src/BoardZ/vendor/jquery/jquery.hammer.js',
            './src/BoardZ/vendor/jquery/jquery.slimscroll.js',
            // './src/BoardZ/vendor/pNotify/pnotify-adapter.js', //TODO: require is not defined exception
            './src/BoardZ/vendor/pNotify/pnotify.custom.js',
            './src/BoardZ/vendor/signalr/signalr.js',
            './src/BoardZ/vendor/bootstrap/js/bootstrap.js',
            './src/BoardZ/vendor/fastclick/fastclick.js',
            './src/BoardZ/vendor/admin-lte/js/app.js',
            './src/BoardZ/vendor/leaflet-js/leaflet-src.js'
        ],
        bundles: [
            './node_modules/@angular/**/*.umd.min.js',
            './node_modules/rxjs/**/*.umd.min.js'
        ],
        fonts: [
            './src/BoardZ/vendor/font-awesome/fonts/*.*',
            './src/BoardZ/vendor/bootstrap/fonts/*.*'
        ],
        resources: './resources/',
        electronFiles: [
            './electron/**/*'
        ]
    },
    targets: {
        build: {
            web: 'build/web',
            styles: 'build/web/styles',
            lib: 'build/web/lib',
            assets: 'build/web/assets',
            fonts: 'build/web/fonts',
            vendorJs: 'build/web/lib/vendor.js',
            injectables: [
                'build/web/styles/**/*.css',
                'build/web/system.setup.js'
            ],
            desktop: 'build/desktop',
            desktopWeb: 'build/desktop/web',
            desktopBuild: 'build/desktop/build'
        }
    },
    typeScript: {
        build: {
            all: {
                buildMode: 'all',
                compilerOptions: {
                    target: 'ES5',
                    module: 'system',
                    moduleResolution: 'node',
                    sourceMap: true,
                    emitDecoratorMetadata: true,
                    experimentalDecorators: true,
                    removeComments: false,
                    noImplicitAny: false
                }
            },
            partial: {
                buildMode: 'partial',
                compilerOptions: {
                    target: 'ES5',
                    module: 'system',
                    moduleResolution: 'node',
                    sourceMap: true,
                    emitDecoratorMetadata: true,
                    experimentalDecorators: true,
                    removeComments: false,
                    noImplicitAny: false,
                    isolatedModules: true
                }
            }
        },
        dist: {
            //TODO: implement
        }
    },

};


module.exports = config;
