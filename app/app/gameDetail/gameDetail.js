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
     */
    function GameDetailController($scope, $stateParams, $translate, boardGamesApi, ngNotify) {
        initialize();

        function initialize() {
            boardGamesApi.single($stateParams.gameId)
                .then(function (result) {
                    $scope.game = result;
                }, function (err) {
                    // TODO: Error case
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
    }

    app.module.controller('gameDetailController', GameDetailController);
}();