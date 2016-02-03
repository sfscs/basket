angular.module('filters')
	.filter('userHasAccess', function() {
		/**
		 * returns an array of lists the user has access to
		 */
		return function (input, userId) {
			var output = [];
			angular.forEach(input, function(list) {
				// check if the user is the owner
				if(list.owner_id === userId) {
					this.push(list);
				}
				else {
					var that = this;
					// check if the list is shared with the user
					list.shared_with.forEach(function(e) {
						if (e === userId) {
							that.push(list);
						}
					});
				}
			}, output);
			return output;
		};
	})
	.filter('assignableUsers', function() {
		/**
		 * returns an array of users that have access to a list
		 * requires a list object, not a listId
		 */
		return function (input, list) {
			var output = [];
			// iterate over users
			angular.forEach(input, function(user) {
				if(list.owner_id === user.id) {
					// check if the user is the owner
					this.push(user);
				}
				else {
					var that = this;
					// check if the list is shared with the user
					list.shared_with.forEach(function(e) {
						if (e === user.id) {
							that.push(user);
						}
					});
				}
			}, output);
			return output;
		};
	})
	.filter('itemInList', function() {
		return function(input, listId) {
			var output = [];
			angular.forEach(input, function(item) {
				if (item.list_id === listId) {
					this.push(item);
				}
			}, output);
			return output;
		};
	})
	.filter('commentForItem', function() {
		return function(input, itemId) {
			var output = [];
			angular.forEach(input, function(comment) {
				if (comment.item_id === itemId) {
					this.push(comment);
				}
			}, output);
			return output;			
		};
	})
;
