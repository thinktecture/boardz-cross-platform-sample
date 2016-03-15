System.config({
    packages: {
        app: {
            format: 'register',
            defaultExtension: 'js'
        }
    },
    map: {
        jquery: 'scripts/bundles/jquery-2.1.4.js',
        'admin-lte/js/app': 'scripts/bundles/app.js',
        'jquery/jquery.slimscroll': 'scripts/bundles/jquery.slimscroll.js',
        'bootstrap/js/bootstrap': 'scripts/bundles/bootstrap.js',
        'signalr/signalr': 'scripts/bundles/signalr.js'
    }
});

System.import('jquery')
    .then(function () {
        return System.import('jquery/jquery.slimscroll');
    })
    .then(function () {
        return System.import('bootstrap/js/bootstrap');
    })
    .then(function () {
        return System.import('admin-lte/js/app');
    })
    .then(function () {
        return System.import('signalr/signalr');
    })
    .then(function () {
        return System.import('app/main');
    })
    .then(null, console.error.bind(console));
