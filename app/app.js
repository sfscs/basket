angular.module('basketApp', [
	'ui.bootstrap',
	'ngRoute',
	'controllers',
	'factories',
	'filters'
]).run(['$rootScope', 'StorageService', 'IdService', 'Users', 'Lists', 'Items', function ($rootScope, StorageService, IdService, Users, Lists, Items) {
	if (StorageService.get('autoIncrement') === null) {
		StorageService.clearAll();
		StorageService.set('autoIncrement', 0);
		IdService.init();
		var newUser = Users.createNew('Jake');
		StorageService.set('basketUsers', [newUser]);
		var newList = Lists.createNew(newUser.id, 'My List');
		StorageService.set('basketLists', [newList]);
		StorageService.set('basketItems', [
			Items.createNew(newUser.id, newList.id, 'cheese'),
			Items.createNew(newUser.id, newList.id, 'wallet'),
			Items.createNew(newUser.id, newList.id, 'pants')
		]);
	}
	IdService.init();
	Users.init();
	Lists.init();
	Items.init();
}])
;
