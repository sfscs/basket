angular.module('factories', [])

	.factory('StorageService', function () {
		var keyPrefix = 'basket_';
		function set(key, data) {
			localStorage.setItem(keyPrefix + key, JSON.stringify(data));
		}
		function get(key) {
			return JSON.parse(localStorage.getItem(keyPrefix + key));
		}
		function clearAll() {
			localStorage.clear();
			localStorage.removeItem(keyPrefix + 'auto_increment');
			localStorage.removeItem(keyPrefix + 'users');
			localStorage.removeItem(keyPrefix + 'lists');
			localStorage.removeItem(keyPrefix + 'items');
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
				autoIncrement = parseInt(StorageService.get('auto_increment'));
			}
			function newId() {
				autoIncrement = autoIncrement + 1;
				StorageService.set('auto_increment', autoIncrement);
				return autoIncrement - 1;
			}
			return {
				init: init,
				newId: newId
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
				lists.data = StorageService.get('lists');
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

			function add(user) {
				lists.data.push(user);
				saveToStorage();
			}

			function remove(listId) {
				var i = lists.data.filter(function(entry) {
					return entry.id === listId;
				})[0];
				var idx = lists.data.indexOf(i);
				lists.data.splice(idx, 1);
				saveToStorage();
			}

			function saveToStorage() {
				StorageService.set('lists', lists.data);
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
			users.getUserById = getUserById;
			users.getUserIdx = getUserIdx;

			function init() {
				users.data = StorageService.get('users');
			}

			function getUserById(userId) {
				return users.data[getUserIdx(userId)];
			}

			function getUserIdx(userId) {
				var i = users.data.filter(function(entry) {
					return entry.id === userId
				})[0];
				var idx = users.data.indexOf(i);
				return idx;
			}

			function createNew(userName) {
				return {
					"id": IdService.newId(),
					"name": userName.trim(),
					"last_list": ''
				};
			}

			function add(user) {
				users.data.push(user);
				saveToStorage();
			}

			function remove(userID) {
				var i = users.data.filter(function(entry) {
					return entry.id === userID;
				})[0];
				var idx = users.data.indexOf(i);
				users.data.splice(idx, 1);
				saveToStorage();
			}

			function saveToStorage() {
				StorageService.set('users', users.data);
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
	])
	.factory('AppData', ['$rootScope', 'Users', 'StorageService', 
		function AppDataFactory($rootScope, Users, StorageService) {
			var appData = {};
			appData.data = {};
			appData.data.currentUser = '';
			appData.data.currentList = '';
			appData.createNew = createNew;
			appData.init = init;

			function createNew() {
				return {
					currentUser: '',
					currentList: ''
				};
			}

			function init() {
				appData.data = StorageService.get('app_data');
				$rootScope.$watch(function() { 
					return appData.data;
				}, function(newValue, oldValue) {
					saveToStorage();
				});
			}

			function saveToStorage() {
				StorageService.set('app_data', appData.data);
			}
			return appData;
		}
	])
;
