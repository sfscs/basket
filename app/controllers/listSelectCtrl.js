angular
	.module('controllers')
	.controller('ListSelectCtrl', ListSelectCtrl);
	
ListSelectCtrl.$inject = ['$scope', '$stateParams', 'Lists', 'Users', 'Items', 'AppData', 'Comments'];

function ListSelectCtrl($scope, $stateParams, Lists, Users, Items, AppData, Comments) {
	// public methods
	$scope.countItems = function countItems(listId) {
		var _items = Items.getItemsByListId(listId);
		return _items.length;
	}

	// bind shoppingLists model to list data service
	$scope.lists = Lists.data;

	// set user model
	$scope.user = Users.getUserById($stateParams.userId);
}
