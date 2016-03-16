System.config({
    packages: {
        app: {
            format: 'register',
            defaultExtension: 'js'
        }
    },
    map: {
        'jquery': 'scripts/bundles/jquery-2.1.4.js',
        'hammer/hammer': 'scripts/bundles/hammer.js',
        'jquery/jquery-hammer': 'scripts/bundles/jquery.hammer.js',
        'jquery/jquery.slimscroll': 'scripts/bundles/jquery.slimscroll.js',
        'bootstrap/js/bootstrap': 'scripts/bundles/bootstrap.js',
        'pnotify/pnotify.custom': 'scripts/bundles/pnotify.custom.js',
        'admin-lte/js/app': 'scripts/bundles/app.js',
        'signalr/signalr': 'scripts/bundles/signalr.js',
        'leaflet/leaflet': 'scripts/bundles/leaflet-src.js',
        'fastclick/fastclick': 'scripts/bundles/fastclick.js'
    }
});

System.import('hammer/hammer')
    .then(function () {
        return System.import('jquery');
    })
    .then(function () {
        return System.import('jquery/jquery-hammer');
    })
    .then(function () {
        return System.import('jquery/jquery.slimscroll');
    })
    .then(function () {
        return System.import('pnotify/pnotify.custom');
    })
    .then(function () {
        return System.import('signalr/signalr');
    })
    .then(function () {
        return System.import('bootstrap/js/bootstrap');
    })
    .then(function () {
        return System.import('fastclick/fastclick');
    })
    .then(function () {
        return System.import('admin-lte/js/app');
    })
    .then(function () {
        return System.import('leaflet/leaflet');
    })
    .then(function () {
        return System.import('app/main');
    })
    .then(null, console.error.bind(console));
