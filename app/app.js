var basketApp = angular.module('basketApp', [
	'ui.bootstrap',
	'ngRoute',
	'controllers',
	'factories'
])
.value('resetBasketApp', function() {	
	localStorage.clear();
	$window.location.reload();
});