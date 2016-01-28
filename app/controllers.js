angular.module('controllers', [])
	.controller('UserCtrl', ['$rootScope', '$scope', 'Users', 'AppData',
		function ($rootScope, $scope, Users, AppData) {
			// bind the users model to the data service
			$scope.users = Users.data;

			// set the selectedUser model (dereferenced obj)
			$scope.selectedUser = Users.getUserById(AppData.data.currentUser);

			// set a watch on the selectedUser model
			$scope.$watch(
				function() { return $scope.selectedUser;}, 
				function(newValue, oldValue) {
					// set currentUser (dereferenced int)
					AppData.data.currentUser = newValue.id;

					// set currentList to the new user's last viewed list (dereferenced int)
					AppData.data.currentList = newValue.last_list;

					// save app state to storage
					AppData.saveToStorage();
				}
			);
		}
	])
	.controller('ListCtrl', ['$scope', 'Lists', 'Users', 'Items', 'AppData',
		function ($scope, Lists, Users, Items, AppData) {
			// public methods
			$scope.addShoppingItem = addShoppingItem;
			$scope.removeShoppingItem = removeShoppingItem;

			// bind shoppingLists model to list data service
			$scope.shoppingLists = Lists.data;

			// bind shoppingItems model to item data service
			$scope.shoppingItems = Items.data;

			// set currentUser model (dereferrenced int)
			$scope.currentUser = AppData.data.currentUser;

			// pull the list object from the currentList id and set selectedList to it
			$scope.selectedList = Lists.getListById(AppData.data.currentList);

			// set a watch on the currentUser (int) from the app state
			$scope.$watch(
				function() { return AppData.data.currentList;}, 
				function(newValue, oldValue) {
					// update currentUser model (dereferrenced int)
					$scope.currentUser = AppData.data.currentUser;

					// pull the list object from the currentList id and set selectedList to it
					$scope.selectedList = Lists.getListById(AppData.data.currentList);
					
					console.log('list ctrl', 'list: ', $scope.selectedList, 'user: ', $scope.currentUser);
				}
			);

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
