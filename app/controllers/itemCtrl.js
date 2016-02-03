angular
	.module('controllers')
	.controller('ItemCtrl', ItemCtrl);
	
ItemCtrl.$inject = ['$scope', '$attrs', '$state', '$stateParams', 'Lists', 'Users', 'Items', 'Comments'];

function ItemCtrl($scope, $attrs, $state, $stateParams, Lists, Users, Items, Comments) {
	/* this controller must be nested inside a ListCtrl */
	$scope.isEditing = false;
	$scope.itemCheck = $scope.item.is_checked;
	$scope.newItemName = $scope.item.name;
	
	$scope.setCheckBox = function setCheckBox(value) {
		$scope.itemCheck = value;
		Items.editItem($scope.item.id, 'is_checked', value);
	}

	$scope.startItemEdit = function startEdit() {
		$scope.isEditing = true;
	};

	$scope.saveItemEdit = function saveItemEdit(newItemName) {
		if(newItemName.trim()) {
			Items.editItem($scope.item.id, 'name', newItemName.trim());
			$scope.newItemName = $scope.item.name;
			$scope.isEditing = false;
		}
		else {
			$scope.cancelItemEdit();
		}
	};

	$scope.cancelItemEdit = function cancelItemEdit() {
		$scope.newItemName = $scope.item.name;
		$scope.isEditing = false;
	};

	$scope.deleteItem = function deleteItem() {
		Items.remove($scope.item.id);
	};

	$scope.assignItem = function(userId) {
		Items.editItem($scope.item.id, 'assigned_to_id', userId);
	}
}