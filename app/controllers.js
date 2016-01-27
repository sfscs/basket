angular.module('controllers', [])
	.controller('UserCtrl', ['$scope', 'Users',
		function ($scope, Users) {

		}
	])
	.controller('ListCtrl', ['$scope', 'Items',
		function ($scope, Items) {
			$scope.shoppingItems = Items.data;
			$scope.addShoppingItem = addShoppingItem;
			$scope.removeShoppingItem = removeShoppingItem;

			function addShoppingItem () {
				if($scope.enteredShoppingItem) {
					Items.add(Items.createNew(1, 1, $scope.enteredShoppingItem));
					$scope.enteredShoppingItem = '';
				}
				else {
					$scope.enteredShoppingItem = '';
				}
			};

			function removeShoppingItem(shoppingItemID) {
				Items.remove(shoppingItemID);
			};
		}
	])
	.controller('AppCtrl', ['$scope', '$window', 'StorageService',
		function($scope, $window, StorageService) {
			$scope.resetBasketApp = resetBasketApp;

			function resetBasketApp() {
				StorageService.clearAll();
				$window.location.reload();
			}
		}
	])
;
