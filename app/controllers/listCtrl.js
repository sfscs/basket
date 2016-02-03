angular
	.module('controllers')
	.controller('ListCtrl', ListCtrl);
	
ListCtrl.$inject = ['$scope', '$state', '$stateParams', 'Lists', 'Users', 'Items', 'Comments'];

function ListCtrl($scope, $state, $stateParams, Lists, Users, Items, Comments) {
	$scope.items = Items.data;
	$scope.comments = Comments.data;
	$scope.assignableUsers = Users.data;
	$scope.list = Lists.getListById($stateParams.listId);
	$scope.listNameChange = $scope.list.name;

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

	$scope.edit = function edit() {
		$state.go('list.edit');
	}

	$scope.addItem = function addItem(itemName) {
		var _item = Items.createNew($stateParams.userId, $stateParams.listId, itemName);
		Items.add(_item);
	}

	$scope.addComment = function addComment(itemId, comment) {
		var _comment = Comments.createNew($stateParams.userId, itemId, comment);
		Comments.add(_comment);
	}

	$scope.getCommentOwner = function getCommentOwner(comment) {
		var _user = Users.getUserById(comment.owner_id);
		return _user;
	}

	$scope.getUser = function getUser(userId) {
		var _user = Users.getUserById(userId);
		return _user;
	}

	$scope.beginEditName = function beginEditName() {

	}
}
