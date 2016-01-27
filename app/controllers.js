angular.module('controllers', [])
	.controller('UserCtrl', ['$scope', 'IdProvider', function ($scope, IdProvider) {

		// $scope.shoppingItems = (localStorage.getItem('shoppingItems')!==null) ? JSON.parse(localStorage.getItem('shoppingItems')) :	[buildShoppingItemObject('cheese'), buildShoppingItemObject('wallet'), buildShoppingItemObject('pants')];

	}])
	.controller('ListCtrl', ['$scope', 'Items', 'ItemCreator', function ($scope, Items, ItemCreator) {
		$scope.shoppingItems = Items.data;
		$scope.addShoppingItem = addShoppingItem;
		$scope.removeShoppingItem = removeShoppingItem;

		function addShoppingItem () {
			if($scope.enteredShoppingItem) {
				Items.add(ItemCreator(1, 1, $scope.enteredShoppingItem));
				$scope.enteredShoppingItem = '';
			}
			else {
				$scope.enteredShoppingItem = '';
			}
		};

		function removeShoppingItem(shoppingItemID) {
			Items.remove(shoppingItemID);
		};

	}])
	.controller('AppCtrl', ['$scope', '$window', function($scope, $window) {
		$scope.resetBasketApp = resetBasketApp;

		function resetBasketApp() {
			localStorage.clear();
			$window.location.reload();
		}
	}])
;