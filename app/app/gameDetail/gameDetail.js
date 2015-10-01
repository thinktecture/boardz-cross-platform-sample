!function ($, jQuery, window, document) {
    'use strict';

    /**
     * @public
     * @constructor
     *
     * @param $scope
     * @param $state
     * @param $stateParams
     * @param $translate
     * @param {BoardGamesApi} boardGamesApi
     * @param {PlayersApi} playersApi
     * @param ngNotify
     * @param {Geolocation} geolocation
     * @param {Camera} camera
     * @param {Security} security
     */
    function GameDetailController($scope, $state, $stateParams, $translate, boardGamesApi, playersApi, ngNotify, geolocation, camera, security) {
        initialize();

        $scope.defaults = {
          tileLayer: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'
        };

        function initialize() {
            if (!$stateParams.gameId) {
                $state.go('games');
                return;
            }

            boardGamesApi.single($stateParams.gameId)
                .then(function (result) {
                    $scope.game = result;
                }, function (err) {
                    // TODO: Error case
                });

            $scope.locationError = false;
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
                }, function () {
                    $scope.locationError = true;
                });
        }

        $scope.save = function () {
            if (!$scope.game && !$scope.game.name && !$scope.name.description) {
                return;
            }

            boardGamesApi.update($scope.game)
                .then(function () {
                    ngNotify.set($translate.instant('gameDetails.success'), 'success');
                }, showErrorNotification);
        };

        $scope.takePhoto = function () {
            $scope.photoError = false;

            camera.takePhoto()
                .then(function (photo) {
                    $scope.photoUrl = photo;
                }, function () {
                    $scope.photoError = true;
                });
        };

        $scope.sendIAmGaming = function () {
            if (!$scope.center || !$scope.photoUrl) {
                return;
            }

            playersApi.add({
                name: security.getUser(),
                boardGameId: $stateParams.gameId,
                coordinate: {
                    latitude: $scope.center.lat,
                    longitude: $scope.center.lng
                },
                imageUrl: $scope.photoUrl
            })
                .then(function () {
                    ngNotify.set($translate.instant('gameDetails.iAmGamingSuccess'), 'success');
                })
        };

        function showErrorNotification() {
            ngNotify.set($translate.instant('gameDetails.error'), 'error');
        }
    }

    app.module.controller('gameDetailController', GameDetailController);
}();