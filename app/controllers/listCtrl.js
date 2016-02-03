angular
	.module('controllers')
	.controller('ListCtrl', ListCtrl);
	
ListCtrl.$inject = ['$scope', '$state', '$stateParams', 'Lists', 'Users', 'Items', 'Comments'];

function ListCtrl($scope, $state, $stateParams, Lists, Users, Items, Comments) {
	$scope.items = Items.data;
	$scope.users = Users.data;
	$scope.comments = Comments.data;
	$scope.currentUser = Users.getUserById($stateParams.userId);
	$scope.list = Lists.getListById($stateParams.listId);

	/* helpers */
	$scope.getUser = Users.getUserById;

	/* list editing */
	$scope.addItem = addItem;
	$scope.isEditingListName = false;
	$scope.newListName = $scope.list.name;
	$scope.startListNameEdit = startListNameEdit;
	$scope.saveListNameEdit = saveListNameEdit;
	$scope.cancelListNameEdit = cancelListNameEdit;
	$scope.deleteList = deleteList;

	/* navigation */
	$scope.goBack = goBack;
	$scope.listEdit = listEdit;

	/* comments */
	$scope.countComments = countComments;
	$scope.addComment = addComment;
	$scope.getCommentOwner = getCommentOwner;
	
	/* sharing */
	$scope.isSharedWith = isSharedWith;
	$scope.toggleShare = toggleShare;

	function addItem(enteredItemName) {
		var _item = Items.createNew($stateParams.userId, $stateParams.listId, enteredItemName.trim());
		Items.add(_item);
	}

	function startListNameEdit() {
		$scope.isEditingListName = true;
	}

	function saveListNameEdit(newListName) {
		if(newListName.trim()) {
			Lists.editList($scope.list.id, 'name', newListName.trim());
			$scope.newListName = $scope.list.name;
			$scope.isEditingListName = false;
		}
		else {
			$scope.cancelListNameEdit();
		}
	}

	function cancelListNameEdit() {
		$scope.newListName = $scope.list.name;
		$scope.isEditingListName = false;
	}

	function deleteList() {
		Lists.remove($scope.list.id);
		$state.go('user.lists', {userId: $stateParams.userId});
	}

	function countComments(itemId) {
		var _comments = Comments.getCommentsByItemId(itemId);
		return _comments.length;
	}

	function goBack() {
		switch($state.current.name) {
			case 'list.edit':
				$state.go('list.items');
				break;
			case 'list.items':
				$state.go('user.lists', {userId: $stateParams.userId});
				break;
		}
	}

	function listEdit() {
		$state.go('list.edit');
	}

	function addComment(itemId, comment) {
		var _comment = Comments.createNew($stateParams.userId, itemId, comment);
		Comments.add(_comment);
	}

	function getCommentOwner(comment) {
		var _user = Users.getUserById(comment.owner_id);
		return _user;
	}

	function isSharedWith(userId) {
		if ($scope.list.shared_with.indexOf(userId) === -1) {
			return false;
		}
		return true;
	}

	function toggleShare(userId) {
		if ($scope.isSharedWith(userId)) {
			Lists.unShareList(userId, $scope.list.id);
		}
		else {
			Lists.shareList(userId, $scope.list.id);
		}
	}
}
