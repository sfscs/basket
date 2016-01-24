angular.module('controllers', [])
	.controller('ListCtrl', ['$scope', 'idProvider', function($scope, idProvider) {
		function buildShoppingItemObject(name) {
			return {
				id: idProvider.newID(),
				name: name.trim(),
				list: ''
			}
		}
		
		$scope.shoppingItems = (localStorage.getItem('shoppingItems')!==null) ? JSON.parse(localStorage.getItem('shoppingItems')) :	[buildShoppingItemObject('cheese'), buildShoppingItemObject('wallet'), buildShoppingItemObject('pants')];

		$scope.addShoppingItem = function() {
			if($scope.enteredShoppingItem) {
				$scope.shoppingItems.push(
					buildShoppingItemObject($scope.enteredShoppingItem)
				);
				$scope.enteredShoppingItem = '';
				$scope.saveList();
			}
			else {
				$scope.enteredShoppingItem = '';
			}
		};

		$scope.removeShoppingItem = function(shoppingItemID) {
			// find the idx of the item with the id
			var i = $scope.shoppingItems.filter(function(entry){
				return entry.id === shoppingItemID;
			})[0];
			var idx = $scope.shoppingItems.indexOf(i);
			$scope.shoppingItems.splice(idx, 1);
			$scope.saveList();
		};

		$scope.saveList = function() {
			localStorage.setItem('shoppingItems', JSON.stringify($scope.shoppingItems));
		}

		$scope.saveList();
	}]);