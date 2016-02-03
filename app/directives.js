angular.module('directives')
	.directive('itemEditFocus', ['$timeout', function itemEditFocus($timeout) {
		return function (scope, elem, attrs) {
			scope.$watch(attrs.itemEditFocus, function (newVal) {
				if (newVal) {
					$timeout(function () {
						elem[0].focus();
					}, 50, false);
				}
			});
		};
	}])
;
