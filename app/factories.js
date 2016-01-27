angular.module('factories', [])
	.factory('StorageService', function StorageServiceFactory() {
		function set(key, data) {
			localStorage.setItem(key, JSON.stringify(data));
		}
		function get(key) {
			return JSON.parse(localStorage.getItem(key));
		}
		return {
			get: get,
			set: set
		};
	})
	.factory('IdService', ['StorageService', function IdServiceFactory(StorageService) {
		var autoIncrement = (StorageService.get('autoIncrement') !== null) ? 
			parseInt(StorageService.get('autoIncrement')) : 0;
		StorageService.set('autoIncrement', autoIncrement);
		return function() {
			StorageService.set('autoIncrement', ++autoIncrement);
			return autoIncrement - 1;
		};
	}])
	.factory('UserCreator', ['IdService', function UserCreatorFactory(IdService) {
		return function(userName) {
			return {
				"id": IdService(),
				"name": userName.trim()
			};
		};
	}])
	.factory('ListCreator', ['IdService', function ListCreatorFactory(IdService) {
		return function(ownerID, listName) {
			return {
				"id": IdService(),
				"name": listName.trim(),
				"owner_id": ownerID,
				"list_type": "normal",
				"shared_with": [],
				"added_date": Date.now()
			}
		};
	}])
	.factory('ItemCreator', ['IdService', function ItemCreatorFactory(IdService) {
		return function(ownerID, listID, itemName) {
			return {
				"id": IdService(),
				"name": itemName.trim(),
				"checked": false,
				"owner_id": ownerID,
				"list_id": listID,
				"assigned_to_id": ownerID,
				"added_date": Date.now()
			}
		};
	}])
	.factory('Items', ['ItemCreator', 'StorageService', function ItemsFactory(ItemCreator, StorageService) {
		items = {};
		items.data = (StorageService.get('shoppingItems') !== null) ? 
			StorageService.get('shoppingItems') :	
			[ItemCreator(1,1,'cheese'), ItemCreator(1,1,'wallet'), ItemCreator(1,1,'pants')];
		items.add = add;
		items.remove = remove;

		function add(item) {
			items.data.push(item);
			saveToStorage();
		}
		function remove(shoppingItemID) {
			var i = items.data.filter(function(entry) {
				return entry.id === shoppingItemID;
			})[0];
			var idx = items.data.indexOf(i);
			items.data.splice(idx, 1);
			saveToStorage();
		}
		function saveToStorage() {
			StorageService.set('shoppingItems', items.data);
		}
		return items;
	}])
;
