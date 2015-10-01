!function($, jQuery){
	'use strict';
	
	window.app = window.app || {};
	window.app.module = angular.module('basta-sample', ['ui.router', 'pascalprecht.translate', 'ngSanitize']);
	
    FastClick.attach(document.body);
	
}();
