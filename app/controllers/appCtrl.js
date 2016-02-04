angular
	.module('controllers')
	.controller('AppCtrl', AppCtrl);
	
AppCtrl.$inject = ['$state', '$scope', '$state', '$window', 'StorageService'];

function AppCtrl($state, $scope, $state, $window, StorageService) {
	$scope.resetBasketAppClearAll = resetBasketAppClearAll;
	$scope.resetBasketAppDemoData = resetBasketAppDemoData;

	function resetBasketAppDemoData() {
		StorageService.clearAll();
		$state.go('users');
		$window.location.reload();
	}

	function resetBasketAppClearAll() {
		StorageService.clearAll();
		StorageService.set('auto_increment', 0);
		StorageService.set('users', []);
		StorageService.set('lists', []);
		StorageService.set('items', []);
		StorageService.set('comments', []);
		$state.go('users');
		$window.location.reload();
	}
}
