!function ($, jQuery, window, document) {
    'use strict';

    /**
     * @public
     * @constructor
     *
     * @param $scope
     * @param $stateParams
     * @param $translate
     * @param {BoardGamesApi} boardGamesApi
     * @param ngNotify
     * @param {Geolocation} geolocation
     * @param {Camera} camera
     */
    function GameDetailController($scope, $stateParams, $translate, boardGamesApi, ngNotify, geolocation, camera) {
        initialize();

        function initialize() {
            boardGamesApi.single($stateParams.gameId)
                .then(function (result) {
                    $scope.game = result;
                }, function (err) {
                    // TODO: Error case
                });

            geolocation.getCoordinatesFromSensor()
                .then(function (coordinates) {
                    $scope.center = {
                        lat: coordinates.latitude,
                        lng: coordinates.longitude,
                        zoom: 16
                    };

                    $scope.markers = {
                        centerMarker: {
                            lat: coordinates.latitude,
                            lng: coordinates.longitude,
                            focus: true,
                            draggable: false
                        }
                    }
                });
        }

        $scope.save = function () {
            if (!$scope.game && !$scope.game.name && !$scope.name.description) {
                return;
            }

            boardGamesApi.update($scope.game)
                .then(function () {
                    ngNotify.set($translate.instant('gameDetails.success'), 'success');
                });
        };

        $scope.takePhoto = function () {
            camera.takePhoto()
                .then(function (photo) {
                    console.log(photo);
                }, function (err) {
                    console.log(err);
                });
        };
    }

    app.module.controller('gameDetailController', GameDetailController);
}();