angular
	.module('controllers')
	.controller('AppCtrl', AppCtrl);
	
AppCtrl.$inject = ['$scope', '$state', '$window', 'StorageService'];

function AppCtrl($scope, $state, $window, StorageService) {
	$scope.resetBasketApp = resetBasketApp;

	function resetBasketApp() {
		StorageService.clearAll();
		$state.go('users');
		$window.location.reload();
	}
}
