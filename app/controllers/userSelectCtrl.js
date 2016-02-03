angular
	.module('controllers')
	.controller('UserSelectCtrl', UserSelectCtrl);

UserSelectCtrl.$inject = ['$scope', '$state', 'Users'];

function UserSelectCtrl($scope, $state, Users) {
	$scope.users = Users.data;

	$scope.selectUser = function selectUser(user) {
		$state.go('user.lists', {userId: user.id});
	};

	$scope.addUser = function addUser(userName) {
		var _user = Users.createNew(userName);
		Users.add(_user);
	};
}
