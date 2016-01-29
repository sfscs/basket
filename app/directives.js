angular.module('directives')
	.directive('itemList', function() {
		return {
			replace: 'true',
			templateUrl: 'templates/itemList.html'
		}
	})
;
