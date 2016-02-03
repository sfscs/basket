angular
	.module('services')
	.factory('Lists', ListsFactory);

ListsFactory.$inject = ['IdService', 'StorageService'];

function ListsFactory(IdService, StorageService) {
	lists = {};
	lists.data = [];

	lists.init = init;
	lists.add = add;
	lists.remove = remove;
	lists.createNew = createNew;
	lists.getListById = getListById;
	lists.getListIdx = getListIdx;
	lists.editList = editList;
	lists.shareList = shareList;
	lists.unShareList = unShareList;

	function init() {
		lists.data = StorageService.get('lists');
	}

	function shareList(userId, listId) {
		// get the list idx
		var listIdx = getListIdx(listId);

		// get the list
		var _list = getListById(listId);

		// push the user into the shared array
		_list.shared_with.push(userId);

		// save the list
		lists.data[listIdx] = _list;
		saveToStorage();
	}

	function unShareList(userId, listId) {
		// get the list idx
		var listIdx = getListIdx(listId);

		// get the list
		var _list = getListById(listId);

		// get the Idx of the userId in the shared_with array
		var _sharedWithIdx = _list.shared_with.indexOf(userId);

		// remove the user from the shared_with array
		_list.shared_with.splice(_sharedWithIdx, 1);

		// save the list
		lists.data[listIdx] = _list;
		saveToStorage();
	}

	function getListById(listId) {
		return lists.data[getListIdx(listId)];
	}

	function getListIdx(listId) {
		var i = lists.data.filter(function(entry) {
			return entry.id === listId
		})[0];
		var idx = lists.data.indexOf(i);
		return idx;
	}

	function editList(listId, key, value) {
		var idx = lists.getListIdx(listId);
		lists.data[idx][key] = value;
		saveToStorage();
	}

	function createNew(ownerId, listName) {
		return {
			"id": IdService.newId(),
			"name": listName.trim(),
			"owner_id": ownerId,
			"list_type": "normal",
			"shared_with": [],
			"added_date": Date.now()
		};
	}

	function add(list) {
		lists.data.push(list);
		saveToStorage();
	}

	function remove(listId) {
		lists.data.splice(getListIdx(listId), 1);
		saveToStorage();
	}

	function saveToStorage() {
		StorageService.set('lists', lists.data);
	}

	return lists;
}
