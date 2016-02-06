angular
	.module('controllers')
	.controller('UserCtrl', UserCtrl);
	
UserCtrl.$inject = ['$scope', '$state', '$stateParams', 'Lists', 'Users', 'Items'];

function UserCtrl($scope, $state, $stateParams, Lists, Users, Items) {
	$scope.lists = Lists.data;
	$scope.user = Users.getUserById($stateParams.userId);
	$scope.addList = addList; 

	/* helpers */
	$scope.getUser = Users.getUserById;
	$scope.countItems = countItems;

	/* user name editing */
	$scope.newUserName = $scope.user.name;
	$scope.isEditingUserName = false;
	$scope.startUserNameEdit = startUserNameEdit;
	$scope.cancelUserNameEdit = cancelUserNameEdit;
	$scope.saveUserNameEdit = saveUserNameEdit;
	$scope.deleteUser = deleteUser;
	
	/* navigation */
	$scope.goBack = goBack; 
	$scope.userEdit = userEdit;
	$scope.selectList = selectList;

	function addList(listName) {
		Lists.add(Lists.createNew($stateParams.userId, listName));
	}
	
	function countItems(listId) {
		return Items.getItemsByListId(listId).length;
	}

	function startUserNameEdit() {
		$scope.newUserName = $scope.user.name;
		$scope.isEditingUserName = true;
	}

	function cancelUserNameEdit() {
		$scope.isEditingUserName = false;
	}

	function saveUserNameEdit(newUserName) {
		if(newUserName.trim()) {
			Users.editUser($scope.user.id, 'name', newUserName.trim());
			$scope.newUserName = $scope.user.name;
			$scope.isEditingUserName = false;
		}
		else {
			cancelUserNameEdit();
		}
	}

	function deleteUser() {
		Users.remove($scope.user.id);
		$state.go('users');
	}

	function userEdit() {
		$state.go('user.edit');
	}

	function selectList(list) {
		$state.go('list.items', {userId: $stateParams.userId, listId: list.id});
	}

	function goBack() {
		switch($state.current.name) {
			case 'user.lists':
				$state.go('users');
				break;
			case 'user.edit':
				$state.go('user.lists');
				break;
		}
	}
}
