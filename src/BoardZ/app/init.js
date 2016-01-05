!function ($, jQuery) {
    'use strict';

    window.app = window.app || {};
    window.app.module = angular.module('xplatform-sample', ['ui.router',
        'pascalprecht.translate',
        'ngSanitize',
        'ngNotify',
        'angular-loading-bar',
        'leaflet-directive',
        'ngCordova',
        'ngAnimate'
    ]);

    // insert the base URL here
    // app.module.constant('apiBaseUrl', 'https://boardzapi.azurewebsites.net/');
    app.module.constant('apiBaseUrl', 'http://10.211.55.3:8080/'); // TODO: Use https for production

    FastClick.attach(document.body);
}();
