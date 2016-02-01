angular.module('filters')
	.filter('userHasAccess', function() {
		return function (input, userId) {
			var output = [];
			angular.forEach(input, function(list, key) {
				// check if the user is the owner
				if(list.owner_id === userId) {
					this.push(list);
				}
				else {
					var that = this;
					// check if the list is shared with the user
					list.shared_with.forEach(function(e, i, a) {
						if (e === userId) {
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
	.filter('commentForItem', function() {
		return function(input, itemId) {
			var output = [];
			angular.forEach(input, function(comment, key) {
				if (comment.item_id === itemId) {
					this.push(comment);
				}
			}, output);
			return output;			
		}
	})
;
