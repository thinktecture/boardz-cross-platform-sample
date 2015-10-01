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
            boardGamesApi.list()
                .then(function (games) {
                    $scope.games = games;
                });
        }
	}
	
	app.module.controller('gameListController', GameListController);
}();