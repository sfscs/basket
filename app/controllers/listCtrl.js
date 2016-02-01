angular
	.module('controllers')
	.controller('ListCtrl', ListCtrl);
	
ListCtrl.$inject = ['$scope', 'Lists', 'Users', 'Items', 'AppData', 'Comments'];

function ListCtrl($scope, Lists, Users, Items, AppData, Comments) {
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
	$scope.selectedList = Lists.getListById(Users.getUserById($scope.currentUser)["last_list"]);

	$scope.comments = Comments.data;

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
			if (e.value !== $scope.currentUser) {
				// first save the current List id as the last_list value for the previous user
				Users.editUser($scope.currentUser, 'last_list', $scope.selectedList.id);

				// now retrieve the last_list of the new user
				$scope.selectedList = Lists.getListById(Users.getUserById(e.value)["last_list"]);

				// set the current user to the new user
				$scope.currentUser = e.value;

				// now publish a listChange notification
				AppData.publish({
					who: 'ListCtrl',
					what: 'listChange',
					value: $scope.selectedList.id
				});
			}
		}
		else if (e.who !== 'ListCtrl' && e.what === 'listChange') {
			$scope.selectedList = Lists.getListById(e.value);
		}
	});

	function addShoppingItem () {
		if($scope.enteredShoppingItem) {
			Items.add(Items.createNew($scope.currentUser, $scope.selectedList.id, $scope.enteredShoppingItem));
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
