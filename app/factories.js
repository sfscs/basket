angular.module('factories', [])
	.factory('IdProvider', function() {
		var autoIncrement = (localStorage.getItem('autoIncrement')!==null) ? 
			parseInt(localStorage.getItem('autoIncrement')) :	0;
		localStorage.setItem('autoIncrement', autoIncrement);
		return {
			newID: function() {
				localStorage.setItem('autoIncrement', ++autoIncrement);
				return autoIncrement - 1;
			}
		};
	})
	.factory('UserCreator', ['IdProvider', function UserCreatorFactory(IdProvider) {
		return {
			newUser: function(userName) {
				return {
					"id": IdProvider.newID(),
					"name": userName.trim()
				};
			}
		};
	}])
	.factory('ListCreator', ['IdProvider', function ListCreatorFactory(IdProvider) {
		return {
			newList: function(ownerID, listName) {
				return {
					"id": IdProvider.newID(),
					"name": listName.trim(),
					"owner_id": ownerID,
					"list_type": "normal",
					"shared_with": [],
					"added_date": Date.now()
				}
			}
		};
	}])
	.factory('ItemCreator', ['IdProvider', function ItemCreatorFactory(IdProvider) {
		return {
			newItem: function(ownerID, listID, itemName) {
				return {
					"id": IdProvider.newID(),
					"name": itemName.trim(),
					"checked": false,
					"owner_id": ownerID,
					"list_id": listID,
					"assigned_to_id": ownerID,
					"added_date": Date.now()
				}
			}
		};
	}]);
