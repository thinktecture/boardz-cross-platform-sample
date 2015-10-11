!function ($, jQuery, window, document) {
	'use strict';
	
	/**
	 * @public
	 * @constructor
	 * 
	 * @param $scope
	 * @param {BoardGamesApi} boardGamesApi
	 */
	function GameListController($scope, boardGamesApi) {
		init();

        function init() {
            $scope.hasError = false;
            $scope.games = null;

            boardGamesApi.list()
                .then(function (games) {
                    $scope.games = games;
                }, function (err) {
                    $scope.hasError = true;
                });
        }
	}
	
	app.module.controller('gameListController', GameListController);
}();