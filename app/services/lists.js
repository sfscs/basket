angular.module('services').factory('Lists', ['IdService', 'StorageService',
	function ListsFactory(IdService, StorageService) {
		lists = {};
		lists.data = [];

		lists.init = init;
		lists.add = add;
		lists.remove = remove;
		lists.createNew = createNew;
		lists.getListById = getListById;
		lists.getListIdx = getListIdx;

		function init() {
			lists.data = StorageService.get('lists');
		}

		function shareList(userId, listId) {
			// get the list idx
			var listIdx = getListIdx(listId);

			// get the list
			var list = getListById(listId);

			// push the user into the shared array
			list.shared_with.push(userId);

			// save the list
			lists.data[listIdx] = lists;
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
]);
