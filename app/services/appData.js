angular
	.module('services')
	.factory('AppData', AppDataFactory);

AppDataFactory.$inject = ['$rootScope', 'Users', 'StorageService'];

function AppDataFactory($rootScope, Users, StorageService) {
	var appData = {};
	appData.data = createNew();
	appData.createNew = createNew;
	appData.saveToStorage = saveToStorage;
	appData.subscribe = subscribe;
	appData.publish = publish;
	appData.init = init;

	var _subscribers = [];

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

	function subscribe(cb) {
		_subscribers.push(cb);
	}

	function publish(e) {
		if (e.who !== 'AppData') {
			switch(e.what) {
				case 'userChange':
					appData.data.currentUser = e.value;
					break;
				case 'listChange':
					appData.data.currentList = e.value;
					break;
			}
		}
		angular.forEach(_subscribers, function(cb) {
			cb(e);
		});
	}
	return appData;
}
