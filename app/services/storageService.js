angular.module('services').factory('StorageService', function () {
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
});
