angular.module('factories', [])
	.factory('StorageService', function () {
		function set(key, data) {
			localStorage.setItem(key, JSON.stringify(data));
		}
		function get(key) {
			return JSON.parse(localStorage.getItem(key));
		}
		function clearAll() {
			localStorage.clear();
		}
		return {
			get: get,
			set: set,
			clearAll: clearAll
		};
	})
	.factory('IdService', ['StorageService', 
		function IdServiceFactory(StorageService) {
			var autoIncrement;
			function init() {
				autoIncrement = parseInt(StorageService.get('autoIncrement'));
				console.log("autoIncrement: ", autoIncrement);
			}
			function newID() {
				autoIncrement = autoIncrement + 1;
				StorageService.set('autoIncrement', autoIncrement);
				return autoIncrement - 1;
			}
			return {
				init: init,
				newID: newID
			};
		}
	])
	.factory('Lists', ['IdService', 'StorageService',
		function ListsFactory(IdService, StorageService) {
			lists = {};
			lists.data = [];

			lists.init = init;
			lists.add = add;
			lists.remove = remove;
			lists.createNew = createNew;

			function init() {
				lists.data = StorageService.get('basketLists');
			}

			function createNew(ownerID, listName) {
				return {
					"id": IdService.newID(),
					"name": listName.trim(),
					"owner_id": ownerID,
					"list_type": "normal",
					"shared_with": [],
					"added_date": Date.now()
				};
			}

			function add(user) {
				lists.data.push(user);
				saveToStorage();
			}

			function remove(ListID) {
				var i = lists.data.filter(function(entry) {
					return entry.id === ListID;
				})[0];
				var idx = lists.data.indexOf(i);
				lists.data.splice(idx, 1);
				saveToStorage();
			}

			function saveToStorage() {
				StorageService.set('basketLists', lists.data);
			}

			return lists;
		}
	])
	.factory('Users', ['IdService', 'StorageService',
		function UsersFactory(IdService, StorageService) {
			users = {};
			users.data = [];

			users.init = init;
			users.add = add;
			users.remove = remove;
			users.createNew = createNew;

			function init() {
				users.data = StorageService.get('basketUsers');
			}

			function createNew(userName) {
				return {
					"id": IdService.newID(),
					"name": userName.trim()
				};
			}

			function add(user) {
				users.data.push(user);
				saveToStorage();
			}

			function remove(UserID) {
				var i = users.data.filter(function(entry) {
					return entry.id === UserID;
				})[0];
				var idx = users.data.indexOf(i);
				users.data.splice(idx, 1);
				saveToStorage();
			}

			function saveToStorage() {
				StorageService.set('basketUsers', users.data);
			}

			return users;
		}
	])
	.factory('Items', ['IdService', 'StorageService',
		function ItemsFactory(IdService, StorageService) {
			items = {};
			items.data = [];

			items.init = init;
			items.add = add;
			items.remove = remove;
			items.createNew = createNew;

			function init() {
				items.data = StorageService.get('basketItems');
			}

			function createNew(ownerID, listID, itemName) {
				return {
					"id": IdService.newID(),
					"name": itemName.trim(),
					"checked": false,
					"owner_id": ownerID,
					"list_id": listID,
					"assigned_to_id": ownerID,
					"added_date": Date.now()
				}
			};

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
				StorageService.set('basketItems', items.data);
			}

			return items;
		}
	])
;
