angular.module('controllers', [])
.controller('UserCtrl', ['$scope', 'IdProvider', function($scope, IdProvider) {

	$scope.shoppingItems = (localStorage.getItem('shoppingItems')!==null) ? JSON.parse(localStorage.getItem('shoppingItems')) :	[buildShoppingItemObject('cheese'), buildShoppingItemObject('wallet'), buildShoppingItemObject('pants')];

}])
	.controller('ListCtrl', ['$scope', 'ItemCreator', function($scope, ItemCreator) {
		$scope.shoppingItems = (localStorage.getItem('shoppingItems')!==null) ? 
			JSON.parse(localStorage.getItem('shoppingItems')) :	
			[buildShoppingItemObject('cheese'), buildShoppingItemObject('wallet'), buildShoppingItemObject('pants')];
		$scope.addShoppingItem = addShoppingItem;
		$scope.removeShoppingItem = removeShoppingItem;
		$scope.saveList = saveList;

		$scope.saveList();

		function buildShoppingItemObject(name) {
			return {
				id: IdProvider.newID(),
				name: name.trim(),
				list: ''
			}
		}

		function addShoppingItem () {
			if($scope.enteredShoppingItem) {
				$scope.shoppingItems.push(
					ItemCreator.newItem(1, 1, $scope.enteredShoppingItem)
				);
				$scope.enteredShoppingItem = '';
				$scope.saveList();
			}
			else {
				$scope.enteredShoppingItem = '';
			}
		};

		function removeShoppingItem(shoppingItemID) {
			// find the idx of the item with the id
			var i = $scope.shoppingItems.filter(function(entry) {
				return entry.id === shoppingItemID;
			})[0];
			var idx = $scope.shoppingItems.indexOf(i);
			$scope.shoppingItems.splice(idx, 1);
			$scope.saveList();
		};

		function saveList() {
			localStorage.setItem('shoppingItems', JSON.stringify($scope.shoppingItems));
		}
	}])
	.controller('AppCtrl', ['$scope', '$window', function($scope, $window) {
		$scope.resetBasketApp = resetBasketApp;

		function resetBasketApp() {
			localStorage.clear();
			$window.location.reload();
		}
	}]);