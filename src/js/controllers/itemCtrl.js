angular
	.module('controllers')
	.controller('ItemCtrl', ItemCtrl);
	
ItemCtrl.$inject = ['$scope', 'Items'];

/* this controller must be nested inside a ListCtrl */
function ItemCtrl($scope, Items) {
	// assign a item to a user
	$scope.assignItem = assignItem;

	/* check boxes*/
	$scope.itemCheck = $scope.item.is_checked;
	$scope.setCheckBox = setCheckBox;

	/* item name editing */
	$scope.newItemName = $scope.item.name;
	$scope.isEditing = false;
	$scope.startItemEdit = startItemEdit;
	$scope.cancelItemEdit = cancelItemEdit; 
	$scope.saveItemEdit = saveItemEdit;
	$scope.deleteItem = deleteItem;
	
	function setCheckBox(value) {
		$scope.itemCheck = value;
		Items.editItem($scope.item.id, 'is_checked', value);
	}

	function startItemEdit() {
		$scope.isEditing = true;
	}

	function saveItemEdit(newItemName) {
		if(newItemName.trim()) {
			Items.editItem($scope.item.id, 'name', newItemName.trim());
			$scope.newItemName = $scope.item.name;
			$scope.isEditing = false;
		}
		else {
			$scope.cancelItemEdit();
		}
	}

	function cancelItemEdit() {
		$scope.newItemName = $scope.item.name;
		$scope.isEditing = false;
	}

	function deleteItem() {
		Items.remove($scope.item.id);
	}
	
	function assignItem(userId) {
		Items.editItem($scope.item.id, 'assigned_to_id', userId);
	}
}