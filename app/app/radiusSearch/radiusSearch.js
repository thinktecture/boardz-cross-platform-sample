!function ($, jQuery, window, document) {
    'use strict';

    /**
     * @public
     * @constructor
     *
     * @param $scope
     * @param {Geolocation} geolocation
     */
    function RadiusSearchController($scope, geolocation) {
        $scope.locate = function () {
            geolocation.getCoordinatesFromSensor()
                .then(function (coords) {
                    alert('lat: ' + coords.latitude + ', lng:' + coords.longitude);
                });
        };
    }

    app.module.controller('radiusSearchController', RadiusSearchController);
}();