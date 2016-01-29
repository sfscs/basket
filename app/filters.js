angular.module('filters')
	.filter('userHasAccess', function() {
		return function (input, userId) {
			// console.log("filter is run");
			// console.log("input", input);
			// console.log("userId", userId);
			var output = [];
			angular.forEach(input, function(list, key) {
				// console.log("testing", list);
				// check if the user is the owner
				if(list.owner_id === userId) {
					// console.log('owns this list');
					this.push(list);
				}
				else {
					var that = this;
					// check if the list is shared with the user
					list.shared_with.forEach(function(e, i, a) {
						if (e === userId) {
							// console.log('list is shared with');
							that.push(list);
						}
					});
				}
			}, output);
			return output;
		}
	})
	.filter('itemInList', function() {
		return function(input, listId) {
			var output = [];
			angular.forEach(input, function(item, key) {
				if (item.list_id === listId) {
					this.push(item);
				}
			}, output);
			return output;
		}
	})
;
