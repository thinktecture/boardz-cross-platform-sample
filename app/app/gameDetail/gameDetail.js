!function ($, jQuery, window, document) {
	'use strict';
	
	/**
	 * @public
	 * @constructor
	 * 
	 * @param $scope
	 * @param $stateParams
	 */
	function GameDetailController($scope, $stateParams) {
		$scope.gameId = $stateParams.gameId;
	}
	
	app.module.controller('gameDetailController', GameDetailController);
}();