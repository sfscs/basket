angular.module('factories', [])
	.factory('idProvider', function() {
		var autoIncrement = (localStorage.getItem('autoIncrement')!==null) ? 
			parseInt(localStorage.getItem('autoIncrement')) :	0;
		localStorage.setItem('autoIncrement', autoIncrement);
		return {
			newID: function() {
				localStorage.setItem('autoIncrement', ++autoIncrement);
				return autoIncrement - 1;
			}
		};
	});