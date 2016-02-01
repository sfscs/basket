angular.module('directives')
	.directive('item', function() {
		return {
			replace: 'true',
			templateUrl: 'templates/item.html'
		}
	})
	.directive('commentBlock', ['Comments', function(Comments) {
		return {
			replace: 'true',
			templateUrl: 'templates/comments.html'
		}
	}])
;
