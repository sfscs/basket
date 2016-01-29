angular.module('controllers').controller('AppCtrl', 
	['$scope', '$window', 'StorageService',
	function($scope, $window, StorageService) {
		$scope.resetBasketApp = resetBasketApp;

		function resetBasketApp() {
			StorageService.clearAll();
			$window.location.reload();
		}
	}
]);
