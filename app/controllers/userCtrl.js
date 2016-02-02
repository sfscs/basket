angular
	.module('controllers')
	.controller('UserCtrl', UserCtrl);
	
UserCtrl.$inject = ['$scope', '$state', '$stateParams', 'Lists', 'Users', 'Items', 'AppData', 'Comments'];

function UserCtrl($scope, $state, $stateParams, Lists, Users, Items, AppData, Comments) {
	// bind shoppingLists model to list data service
	$scope.lists = Lists.data;

	// set user model
	$scope.user = Users.getUserById($stateParams.userId);

	$scope.countItems = function countItems(listId) {
		var _items = Items.getItemsByListId(listId);
		return _items.length;
	};

	$scope.goBack = function goBack() {
		switch($state.current.name) {
			case 'user.lists':
				$state.go('users');
				break;
			case 'user.edit':
				$state.go('user.lists');
				break;
		}
	};

	$scope.edit = function edit() {
		$state.go('user.edit');
	}

	$scope.selectList = function selectList(list) {
		$state.go('list.items', {userId: $stateParams.userId, listId: list.id});
	};

	$scope.addList = function addList(listName) {
		var _list = Lists.createNew($stateParams.userId, listName);
		Lists.add(_list);
	}

}
