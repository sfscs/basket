angular.module('controllers', [])
	.controller('UserCtrl', ['$rootScope', '$scope', 'Users', 'AppData',
		function ($rootScope, $scope, Users, AppData) {
			$scope.users = Users.data;
			var idx = Users.getUserIdx(AppData.data.currentUser);
			$scope.selectedUser = $scope.users[idx];
			$scope.$watch(
				function() { return $scope.selectedUser;}, 
				function(newValue, oldValue) {
					//AppData.data.currentUser = newValue.id;
					AppData.data.currentUser = newValue.id;
					AppData.data.currentList = newValue.last_list;
					console.log('user ctrl',newValue, oldValue, AppData.data.currentUser);
				});
		}
	])
	.controller('ListCtrl', ['$scope', 'Users', 'Items', 'AppData',
		function ($scope, Users, Items, AppData) {
			$scope.shoppingItems = Items.data;
			$scope.currentUser = AppData.data.currentUser;
			$scope.currentList = AppData.data.currentList;
			$scope.addShoppingItem = addShoppingItem;
			$scope.removeShoppingItem = removeShoppingItem;
			// $scope.currentUser = AppData.data.currentUser;
			$scope.$watch(
				function() { return AppData.data.currentUser;}, 
				function(newValue, oldValue) {
					//AppData.data.currentUser = newValue.id;
					$scope.currentUser = newValue;
					$scope.currentList = Users.getUserById(newValue)['last_list'];
					console.log('list ctrl', 'list: ', $scope.currentList, 'user: ', $scope.currentUser);
				});
			function addShoppingItem () {
				if($scope.enteredShoppingItem) {
					Items.add(Items.createNew($scope.currentUser, 1, $scope.enteredShoppingItem));
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
