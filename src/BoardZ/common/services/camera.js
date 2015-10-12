!function ($, jQuery, window, document) {
    'use strict';

    /**
     * @ngdoc service
     * @name camera
     * @public
     * 
     * @param $injector
     * @param {PlatformInformation} platformInformation
     */
    function Camera($injector, platformInformation) {
        if (platformInformation.isCordova()) {
            return $injector.get('mobileCamera');
        }

        return $injector.get('desktopCamera');
    }

    app.module.factory('camera', Camera);
}();
