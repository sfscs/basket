angular.module('controllers').controller('UserCtrl', 
	['$rootScope', '$scope', 'Users', 'AppData',
	function ($rootScope, $scope, Users, AppData) {
		// bind the users model to the data service
		$scope.users = Users.data;

		// set the selectedUser model (dereferenced obj)
		$scope.selectedUser = Users.getUserById(AppData.data.currentUser);

		AppData.subscribe(function (e) {
			if (e.who !== 'UserCtrl' && e.what === 'userChange') {
				if ($scope.selectedUser !== e.value) {
					$scope.selectedUser = e.value;
				}
			}
		});
		$scope.changeUser = function(user) {
			$scope.selectedUser = user;
			AppData.publish({
				who: 'UserCtrl',
				what: 'userChange',
				value: $scope.selectedUser.id
			});
		}
	}
]);