angular
	.module('controllers')
	.controller('AppCtrl', AppCtrl);
	
AppCtrl.$inject = ['$scope', '$window', 'StorageService'];

function AppCtrl($scope, $window, StorageService) {
	$scope.resetBasketApp = resetBasketApp;

	function resetBasketApp() {
		StorageService.clearAll();
		$window.location.reload();
	}
}
