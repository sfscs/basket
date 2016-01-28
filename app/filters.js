angular.module('filters', [])
	.filter('userHasAccess', function() {
		return function (input, userId) {
			console.log("filter is run");
			console.log("input", input);
			console.log("userId", userId);
			var output = [];

			
			angular.forEach(input, function(list, key) {
				// check if the user is the owner
				console.log("list.owner_id", list.owner_id);
				console.log("userId", userId);
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
;