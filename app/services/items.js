angular
	.module('services')
	.factory('Items', ItemsFactory);

ItemsFactory.$inject = ['IdService', 'StorageService'];

function ItemsFactory(IdService, StorageService) {
	items = {};
	items.data = [];

	items.init = init;
	items.add = add;
	items.remove = remove;
	items.createNew = createNew;
	items.getItemById = getItemById;
	items.getItemIdx = getItemIdx;
	items.getItemsByListId = getItemsByListId;

	function init() {
		items.data = StorageService.get('items');
	}

	function getItemById(itemId) {
		return items.data[getItemIdx(itemId)];
	}

	function getItemIdx(itemId) {
		var i = items.data.filter(function(entry) {
			return entry.id === itemId
		})[0];
		var idx = items.data.indexOf(i);
		return idx;
	}

	function getItemsByListId(listId) {
		var output = [];
		angular.forEach(items.data, function(entry) {
			if (entry.list_id === listId) {
				this.push(entry);
			}
		}, output);
		return output;
	}

	function createNew(ownerId, listId, itemName) {
		return {
			"id": IdService.newId(),
			"name": itemName.trim(),
			"checked": false,
			"owner_id": ownerId,
			"list_id": listId,
			"assigned_to_id": ownerId,
			"added_date": Date.now()
		}
	};

	function add(item) {
		console.log(item);
		items.data.push(item);
		saveToStorage();
	}

	function remove(itemId) {
		items.data.splice(getItemIdx(itemId), 1);
		saveToStorage();
	}

	function saveToStorage() {
		StorageService.set('items', items.data);
	}

	return items;
}
