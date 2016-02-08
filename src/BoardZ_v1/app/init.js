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
    app.module.constant('apiBaseUrl', 'https://boardzapi.azurewebsites.net/');

    FastClick.attach(document.body);
}();
