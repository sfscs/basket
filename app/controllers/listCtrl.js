angular.module('controllers').controller('ListCtrl', 
	['$scope', 'Lists', 'Users', 'Items', 'AppData', '$timeout',
	function ($scope, Lists, Users, Items, AppData, $timeout) {
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

		$scope.changeList = function(list) {
			$scope.selectedList = list;
			Users.editUser($scope.currentUser, "last_list", $scope.selectedList.id);
			AppData.publish({
				who: 'ListCtrl',
				what: 'listChange',
				value: $scope.selectedList.id
			});
		}

		AppData.subscribe(function (e) {
			if (e.who !== 'ListCtrl' && e.what === 'userChange') {
				var newValue = e.value;
				var oldValue = $scope.currentUser;
				var lastList = $scope.selectedList;

				if (newValue !== oldValue) {
					// first save the current List id as the last_list value for the previous user
					Users.editUser(oldValue, 'last_list', lastList);

					// now retrieve the last_list of the new user
					var newUser = getUserById(newValue);
					$scope.selectedList = Lists.getListById(newUser.last_list);
					
					// set the current user to the new user
					$scope.currentUser = e.value;

					// now publish a listChange notification
					AppData.publish({
						who: 'ListCtrl',
						what: 'listChange',
						value: $scope.selectedList
					});
				}
			}
			else if (e.who !== 'ListCtrl' && e.what === 'listChange') {
				$scope.selectedList = Lists.getListById(e.value);
			}
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
]);