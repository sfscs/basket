angular.module('services').factory('Items', ['IdService', 'StorageService',
	function ItemsFactory(IdService, StorageService) {
		items = {};
		items.data = [];

		items.init = init;
		items.add = add;
		items.remove = remove;
		items.createNew = createNew;

		function init() {
			items.data = StorageService.get('items');
		}

		function createNew(ownerID, listId, itemName) {
			return {
				"id": IdService.newId(),
				"name": itemName.trim(),
				"checked": false,
				"owner_id": ownerID,
				"list_id": listId,
				"assigned_to_id": ownerID,
				"added_date": Date.now()
			}
		};

		function add(item) {
			items.data.push(item);
			saveToStorage();
		}

		function remove(shoppingItemId) {
			var i = items.data.filter(function(entry) {
				return entry.id === shoppingItemId;
			})[0];
			var idx = items.data.indexOf(i);
			items.data.splice(idx, 1);
			saveToStorage();
		}

		function saveToStorage() {
			StorageService.set('items', items.data);
		}

		return items;
	}
]);
