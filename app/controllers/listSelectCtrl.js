angular
	.module('controllers')
	.controller('ListSelectCtrl', ListSelectCtrl);
	
ListSelectCtrl.$inject = ['$scope', '$state', '$stateParams', 'Lists', 'Users', 'Items', 'AppData', 'Comments'];

function ListSelectCtrl($scope, $state, $stateParams, Lists, Users, Items, AppData, Comments) {
	// bind shoppingLists model to list data service
	$scope.lists = Lists.data;

	$scope.countItems = function countItems(listId) {
		var _items = Items.getItemsByListId(listId);
		return _items.length;
	};

	$scope.goBackToUsers = function goBackToUsers() {
		$state.go('users', {});
	};

	$scope.selectList = function selectList(list) {
		$state.go('list', {userId: list.owner_id, listId: list.id});
	};

	$scope.addList = function addList(listName) {
		var _list = Lists.createNew($stateParams.userId, listName);
		Lists.add(_list);
	}

	// set user model
	$scope.user = Users.getUserById($stateParams.userId);
}
