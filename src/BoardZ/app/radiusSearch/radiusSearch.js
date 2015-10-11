!function ($, jQuery, window, document) {
    'use strict';

    /**
     * @public
     * @constructor
     *
     * @param $scope
     * @param {Geolocation} geolocation
     * @param {PlayersApi} playersApi
     */
    function RadiusSearchController($scope, geolocation, playersApi) {
        $scope.radiuses = [5, 10, 25, 50, 100, 250, 1000];
        $scope.model = {
            radius: 10
        };

        init();

        function init() {
            geolocation.getCoordinatesFromSensor()
                .then(function (coordinates) {
                    $scope.coordinates = coordinates;
                }, function () {
                    $scope.geolocationUnavailable = true;
                })
        }

        $scope.search = function () {
            playersApi.findNearby($scope.model.radius, {
                latitude: $scope.coordinates.latitude,
                longitude: $scope.coordinates.longitude
            })
                .then(function (results) {
                    $scope.results = results;
                }, function (err) {
                    // TODO: Err
                });
        };
    }

    app.module.controller('radiusSearchController', RadiusSearchController);
}();