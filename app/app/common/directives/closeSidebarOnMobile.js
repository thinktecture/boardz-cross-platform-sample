!function ($, jQuery, window, document) {
    'use strict';

    app.module.directive('closeSidebarOnMobile',
        /**
         * @param {PlatformInformation} platformInformation
         */
        function (platformInformation) {
            return {
                restrict: 'A',
                require: '^bodyElement',
                /**
                 *
                 * @param scope
                 * @param element
                 * @param attrs
                 * @param {BodyElementController} bodyElementController
                 */
                link: function (scope, element, attrs, bodyElementController) {
                    // Only close when using on a mobile device
                    if (!platformInformation.isCordova()) {
                        return;
                    }

                    // Closes the sidebar after clicking on a navigation item
                    // TODO: Verify, that this is the behavior we want
                    element[0].addEventListener('click', function () {
                        bodyElementController.closeSidebar();
                    });
                }
            };
        });
}();
