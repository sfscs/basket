angular.module('services').factory('IdService', ['StorageService', 
	function IdServiceFactory(StorageService) {
		var autoIncrement;
		function init() {
			autoIncrement = parseInt(StorageService.get('auto_increment'));
		}
		function newId() {
			autoIncrement = autoIncrement + 1;
			StorageService.set('auto_increment', autoIncrement);
			console.log('IdService: ', (autoIncrement -1));
			return autoIncrement - 1;
		}
		return {
			init: init,
			newId: newId
		};
	}
]);
