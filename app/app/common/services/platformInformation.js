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

        this.isNwjs = function () {
            return isInNodeWebkit();
        };

        this.isWeb = function () {
            return !this.isCordova() && !this.isNwjs();
        };

        function isInNodeWebkit() {
            var isNode = (typeof process !== "undefined" && typeof require !== "undefined");
            var isNodeWebkit = false;

            if (isNode) {
                try {
                    isNodeWebkit = (typeof require('nw.gui') !== "undefined");
                } catch (e) {
                    isNodeWebkit = false;
                }
            }

            return isNodeWebkit;
        }
    }

    app.module.service('platformInformation', PlatformInformation);
}();
