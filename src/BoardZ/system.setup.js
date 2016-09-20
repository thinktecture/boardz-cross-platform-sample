/**
 * System configuration for Angular 2.
 */
(function (global) {
    // map tells the System loader where to look for things
    var map = {
        'app': 'app', // 'dist',
        '@angular/core': 'ng:core/bundles/core.umd.js',
        '@angular/common': 'ng:common/bundles/common.umd.js',
        '@angular/compiler': 'ng:compiler/bundles/compiler.umd.js',
        '@angular/platform-browser': 'ng:platform-browser/bundles/platform-browser.umd.js',
        '@angular/platform-browser-dynamic': 'ng:platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
        '@angular/http': 'ng:http/bundles/http.umd.js',
        '@angular/router': 'ng:router/bundles/router.umd.js',
        '@angular/forms': 'ng:forms/bundles/forms.umd.js',
        'rxjs': 'rxjs',
        'jquery': 'scripts/bundles/jquery-2.1.4.js',
        'bootstrap/js/bootstrap': 'scripts/bundles/bootstrap.js',
        'admin-lte/js/app': 'scripts/bundles/app.js',
        'jquery/jquery.hammer': 'scripts/bundles/jquery.hammer.js',
        'hammerjs': 'scripts/bundles/hammer.js',
        'hammerjs/hammer': 'scripts/bundles/hammer.js',
        'jquery/jquery.slimscroll': 'scripts/bundles/jquery.slimscroll.js',
        'pnotify': 'scripts/bundles/pnotify.custom.js',
        'pNotify/pnotify-adapter': 'scripts/bundles/pnotify-adapter.js',
        'signalr/signalr': 'scripts/bundles/signalr.js',
        'leaflet/leaflet': 'scripts/bundles/leaflet-src.js',
        'fastclick/fastclick': 'scripts/bundles/fastclick.js',
        'dexie': 'dexie/dexie.js'
    };
    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': { main: 'main.js', defaultExtension: 'js' },
        'rxjs': { defaultExtension: 'js' },
        'dexie': { format: 'amd' }
    };

    var config = {
        paths: {
            'ng:': '@angular/'
        },
        map: map,
        packages: packages
    }
    System.config(config);
})(this);

function backupModule() {
    return new Promise(function (resolve, reject) {
        if (typeof module !== 'undefined' && module.hasOwnProperty('exports')) {
            window.module = module;
            module = undefined;
        }
        resolve(true);
    });
}

function restoreModule() {
    return new Promise(function (resolve, reject) {
        if (window.hasOwnProperty('module')) {
            module = window.module;
        }
        resolve(true);
    });
}

backupModule()
    .then(function () {
        //  return System.import('jquery');
    })
    .then(function () {
        return restoreModule();
    })
    .then(function () {
        return System.import('app/main');
    })
    .then(null, console.error.bind(console));

