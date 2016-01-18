!function ($, jQuery, window, document) {
    'use strict';

    /**
     * @ngdoc service
     * @public
     */
    function PlatformInformation($window) {
        this.isCordova = function () {
            return !!$window.cordova;
        };

        this.isElectron = function() {
            return navigator.userAgent.match(/Electron/) != null;
        };

        this.isNode = function () {
            return typeof process !== "undefined" && typeof require !== "undefined";
        };

        this.isRunningOnMobile = function() {
            return this.isCordova();
        };

        this.isRunningOnDesktop = function() {
          return this.isNode() || this.isElectron();
        };

        this.isWeb = function () {
            return !this.isRunningOnMobile() && !this.isRunningOnDesktop();
        };
    }

    app.module.service('platformInformation', PlatformInformation);
}();
