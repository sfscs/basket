angular.module('basketApp', [
	'ui.bootstrap',
	'ngRoute',
	'services',	
	'directives',
	'filters',
	'controllers',
]).run(['$rootScope', 'StorageService', 'IdService', 'Users', 'Lists', 'Items', 'Comments', 'AppData', 
	function ($rootScope, StorageService, IdService, Users, Lists, Items, Comments, AppData) {
		if (StorageService.get('auto_increment') === null) {
			StorageService.clearAll();
			StorageService.set('auto_increment', 0);
			IdService.init();

			// fake users
			var newUser1 = Users.createNew('Jake');
			var newUser2 = Users.createNew('Jill');
			
			// fake lists
			var newList1 = Lists.createNew(newUser1.id, 'My List');
			var newList2 = Lists.createNew(newUser2.id, 'My List 2');

			// shared list
			newList2.shared_with.push(newUser1.id);

			newUser1.last_list = newList1.id;
			newUser2.last_list = newList2.id;

			StorageService.set('users', [newUser1, newUser2]);

			StorageService.set('lists', [newList1, newList2]);

			var newItems = [
				Items.createNew(newUser1.id, newList1.id, 'cheese'),
				Items.createNew(newUser1.id, newList1.id, 'wallet'),
				Items.createNew(newUser1.id, newList1.id, 'pants'),
				Items.createNew(newUser2.id, newList2.id, 'apples'),
				Items.createNew(newUser2.id, newList2.id, 'dogfood'),
				Items.createNew(newUser2.id, newList2.id, 'rocks')
			];

			StorageService.set('items', newItems);
			StorageService.set('comments', [
				Comments.createNew(newUser1, newItems[0].id, "From cheese store"),
				Comments.createNew(newUser1, newItems[4].id, "Tasty apples only, please"),
				Comments.createNew(newUser2, newItems[4].id, "I like tasty apples"),
				Comments.createNew(newUser2, newItems[5].id, "For the dog")
			]);

			var newAppData = AppData.createNew();
			newAppData.currentUser = newUser1.id;
			newAppData.currentList = newList1.id;
			StorageService.set('app_data', newAppData);
		}
		AppData.init();
		IdService.init();
		Users.init();
		Lists.init();
		Items.init();
		Comments.init();
		// AppData.publish({
		// 	who: 'AppData',
		// 	what: 'listChange',
		// 	value: 
		// }};
	}
]);
