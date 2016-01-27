angular.module('basketApp', [
	'ui.bootstrap',
	'ngRoute',
	'controllers',
	'factories',
	'filters'
]).run(['$rootScope', 'StorageService', 'IdService', 'Users', 'Lists', 'Items', function ($rootScope, StorageService, IdService, Users, Lists, Items) {
	if (StorageService.get('auto_increment') === null) {
		StorageService.clearAll();
		StorageService.set('auto_increment', 0);
		IdService.init();
		var newUser = Users.createNew('Jake');
		StorageService.set('users', [newUser]);
		var newList = Lists.createNew(newUser.id, 'My List');
		StorageService.set('lists', [newList]);
		StorageService.set('items', [
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
