!function ($, jQuery, window, document) {
    "use strict";

    /**
     * @constructor
     * @public
     *
     * @param $window
     * @param {PlatformInformation} platformInformation
     */
    function NavigationController($window, platformInformation) {
        this.showBackButton = !platformInformation.isWeb();

        this.goBack = function () {
            $window.history.back();
        };
    }

    app.module.controller('navigationController', NavigationController);
}();
