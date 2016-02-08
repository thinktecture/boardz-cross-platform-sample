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
     * @param $timeout
     * @param {BoardGamesApi} boardGamesApi
     * @param {PlayersApi} playersApi
     * @param ngNotify
     * @param {Geolocation} geolocation
     * @param {Camera} camera
     * @param {Security} security
     */
    function GameDetailController($scope, $state, $stateParams, $translate, $timeout, boardGamesApi, playersApi, ngNotify, geolocation, camera, security) {
        initialize();

        $scope.game = {};

        $scope.defaults = {
            tileLayer: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'
        };

        function initialize() {
            if ($stateParams.gameId) {
                boardGamesApi.single($stateParams.gameId)
                    .then(function (result) {
                        $scope.game = result;
                    }, function (err) {
                        // TODO: Error case
                    });
            }

            $scope.locationError = false;
            geolocation.getCoordinatesFromSensor()
                .then(function (coordinates) {
                    $timeout(function () {
                        console.log('Got coords');
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
                }, function () {
                    $scope.locationError = true;
                });
        }

        $scope.save = function () {
            if (!$scope.game && !$scope.game.name && !$scope.name.description) {
                return;
            }

            var promise;

            if ($stateParams.gameId) {
                promise = boardGamesApi.update($scope.game);
            }
            else {
                promise = boardGamesApi.add($scope.game);
            }

            promise
                .then(function (gameId) {
                    ngNotify.set($translate.instant('gameDetails.success'), 'success');

                    if (!$stateParams.gameId) {
                        $scope.game.id = gameId;
                        $state.go('.', {
                            gameId: gameId
                        }, {
                            reload: false,
                            notify: false
                        });
                    }
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
                    ngNotify.set($translate.instant('gameDetails.iAmGaming.success'), 'success');
                })
        };

        function showErrorNotification() {
            ngNotify.set($translate.instant('gameDetails.error'), 'error');
        }
    }

    app.module.controller('gameDetailController', GameDetailController);
}();
