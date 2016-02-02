angular
	.module('controllers')
	.controller('UserSelectCtrl', UserSelectCtrl);

UserSelectCtrl.$inject = ['$scope', '$stateParams', '$state', 'Users'];

function UserSelectCtrl($scope, $stateParams, $state, Users) {
	// bind the users model to the data service
	$scope.users = Users.data;

	$scope.selectUser = function selectUser(user) {
		$state.go('user.lists', {userId: user.id});
	}
}
