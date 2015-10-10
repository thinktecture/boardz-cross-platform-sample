!function ($, jQuery, window, document) {
    'use strict';

    /**
     * @constructor
     * @public
     *
     * @param $element
     * @param {PlatformInformation} platformInformation
     */
    function BodyElementController($element, platformInformation) {
        this.closeSidebar = function () {
            if (platformInformation.isCordova()) {
                $element.removeClass('sidebar-open');
            }
            else {
                $element.addClass('sidebar-collapse');
            }
        };
    }

    app.module.directive('bodyElement', function () {
        return {
            restrict: 'A',
            controller: BodyElementController
        };
    });
}();
