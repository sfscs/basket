angular
	.module('services')
	.factory('Users', UsersFactory);

UsersFactory.$inject = ['IdService', 'StorageService'];

function UsersFactory(IdService, StorageService) {
	users = {};
	users.data = [];

	users.init = init;
	users.editUser = editUser;
	users.add = add;
	users.remove = remove;
	users.createNew = createNew;
	users.getUserById = getUserById;
	users.getUserIdx = getUserIdx;
	users.saveToStorage = saveToStorage;

	function init() {
		users.data = StorageService.get('users');
	}

	function editUser(userId, key, value) {
		var idx = users.getUserIdx(userId);
		users.data[idx][key] = value;
		saveToStorage();
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

	function remove(userId) {
		users.data.splice(getUserIdx(userId), 1);
		saveToStorage();
	}

	function saveToStorage() {
		StorageService.set('users', users.data);
	}

	return users;
}
