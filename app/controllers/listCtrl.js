angular
	.module('controllers')
	.controller('ListCtrl', ListCtrl);
	
ListCtrl.$inject = ['$scope', '$state', '$stateParams', '$filter', 'Lists', 'Users', 'Items', 'Comments'];

function ListCtrl($scope, $state, $stateParams, $filter, Lists, Users, Items, Comments) {
	$scope.items = Items.data;
	$scope.users = Users.data;
	$scope.getUser = Users.getUserById;
	$scope.currentUser = Users.getUserById($stateParams.userId);
	$scope.comments = Comments.data;
	$scope.list = Lists.getListById($stateParams.listId);
	$scope.assignableUsers = $filter('assignableUsers')(Users.data, $scope.list);

	$scope.countComments = function countComments(itemId) {
		var _comments = Comments.getCommentsByItemId(itemId);
		return _comments.length;
	};

	$scope.goBack = function goBack() {
		switch($state.current.name) {
			case 'list.edit':
				$state.go('list.items');
				break;
			case 'list.items':
				$state.go('user.lists', {userId: $stateParams.userId});
				break;
		}
	};

	$scope.listEdit = function listEdit() {
		$state.go('list.edit');
	};

	$scope.addItem = function addItem(enteredItemName) {
		var _item = Items.createNew($stateParams.userId, $stateParams.listId, enteredItemName.trim());
		Items.add(_item);
	};

	$scope.addComment = function addComment(itemId, comment) {
		var _comment = Comments.createNew($stateParams.userId, itemId, comment);
		Comments.add(_comment);
	};

	$scope.getCommentOwner = function getCommentOwner(comment) {
		var _user = Users.getUserById(comment.owner_id);
		return _user;
	};

	$scope.isEditingListName = false;
	$scope.newListName = $scope.list.name;

	$scope.startListNameEdit = function startListNameEdit() {
		$scope.isEditingListName = true;
	};

	$scope.saveListNameEdit = function saveListNameEdit(newListName) {
		if(newListName.trim()) {
			Lists.editList($scope.list.id, 'name', newListName.trim());
			$scope.newListName = $scope.list.name;
			$scope.isEditingListName = false;
		}
		else {
			$scope.cancelListNameEdit();
		}
	};

	$scope.cancelListNameEdit = function cancelListNameEdit() {
		$scope.newListName = $scope.list.name;
		$scope.isEditingListName = false;
	};

	$scope.deleteList = function deleteList() {
		Lists.remove($scope.list.id);
		$state.go('user.lists', {userId: $stateParams.userId});
	};

	$scope.isSharedWith = function isSharedWith(userId) {
		if ($scope.list.shared_with.indexOf(userId) === -1) {
			return false;
		}
		return true;
	};

	$scope.toggleShare = function toggleShare(userId) {
		if ($scope.isSharedWith(userId)) {
			Lists.unShareList(userId, $scope.list.id);
		}
		else {
			Lists.shareList(userId, $scope.list.id);
		}
	}
}
