!function($, jQuery){
	
	app.module.config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('dashboard', {
                url: '/',
                views: {
                    'main@': {
                        templateUrl: 'app/dashboard/dashboard.html',
                        controller: 'dashboardController'
                    }
                }
			});
		
		$urlRouterProvider.otherwise('/');
	});
	
}();