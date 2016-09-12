(function (global) {

    var config = {
        paths: {
            'lib:': 'lib/'
        },
        map: {
            'rxjs': 'lib:/rxjs/bundles/Rx.umd.min.js',
            'rxjs/Subject': 'lib:/rxjs/bundles/Rx.umd.min.js',
            'rxjs/Observable': 'lib:/rxjs/bundles/Rx.umd.min.js',
            'rxjs/observable/PromiseObservable': 'lib:/rxjs/bundles/Rx.umd.min.js',
            'rxjs/operator/toPromise': 'lib:/rxjs/bundles/Rx.umd.min.js',
            '@angular/core': 'lib:/@angular/core/bundles/core.umd.min.js',
            '@angular/common': 'lib:/@angular/common/bundles/common.umd.min.js',
            '@angular/compiler': 'lib:/@angular/compiler/bundles/compiler.umd.min.js',
            '@angular/platform-browser': 'lib:/@angular/platform-browser/bundles/platform-browser.umd.min.js',
            '@angular/platform-browser-dynamic': 'lib:/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.min.js',
            '@angular/http': 'lib:/@angular/http/bundles/http.umd.min.js',
            '@angular/router-deprecated': 'lib:/@angular/router-deprecated/bundles/router-deprecated.umd.min.js',
            '@angular/forms': 'lib:/@angular/forms/bundles/forms.umd.min.js',
        },
        packages: {
            'app': { main: 'main.js', defaultExtension: 'js' }
        }
    };

    System.config(config);
})(this);

System.import('app/main').then(() => {

});
