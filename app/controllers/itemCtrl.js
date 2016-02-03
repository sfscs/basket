angular
	.module('controllers')
	.controller('ItemCtrl', ItemCtrl);
	
ItemCtrl.$inject = ['$scope', '$attrs', '$state', '$stateParams', 'Lists', 'Users', 'Items', 'Comments'];

/* this controller must be nested inside a ListCtrl */
function ItemCtrl($scope, $attrs, $state, $stateParams, Lists, Users, Items, Comments) {
	$scope.isEditing = false;
	$scope.newItemName = $scope.item.name;
	$scope.startItemEdit = function startEdit() {
		$scope.isEditing = true;
	}
	$scope.saveItemEdit = function saveItemEdit(newItemName) {
		if(newItemName.trim()) {
			Items.editItem($scope.item.id, 'name', newItemName.trim());
			$scope.newItemName = $scope.item.name;
			$scope.isEditing = false;
		}
		else {
			$scope.cancelItemEdit();
		}
	}
	$scope.cancelItemEdit = function cancelItemEdit() {
		$scope.newItemName = $scope.item.name;
		$scope.isEditing = false;
	}
}