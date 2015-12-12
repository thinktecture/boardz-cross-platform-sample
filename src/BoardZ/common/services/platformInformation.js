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

        this.isNode = function () {
            var isNode = (typeof process !== "undefined" && typeof require !== "undefined");

            return isNode;
        };

        this.isWeb = function () {
            return !this.isCordova() && !this.isNode();
        };
    }

    app.module.service('platformInformation', PlatformInformation);
}();
