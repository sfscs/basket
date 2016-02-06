angular
	.module('services')
	.factory('Comments', CommentsFactory);

CommentsFactory.$inject = ['IdService', 'StorageService'];

function CommentsFactory(IdService, StorageService) {
	comments = {};
	comments.data = [];

	comments.init = init;
	comments.add = add;
	comments.remove = remove;
	comments.createNew = createNew;
	comments.getCommentsByItemId = getCommentsByItemId;

	function init() {
		comments.data = StorageService.get('comments');
	}

	function getCommentById(commentId) {
		return comments.data[getCommentIdx(commentId)];
	}

	function getCommentIdx(commentId) {
		var i = comments.data.filter(function(entry) {
			return entry.id === commentId
		})[0];
		var idx = comments.data.indexOf(i);
		return idx;
	}		

	function createNew(ownerId, itemId, comment) {
		return {
			"id": IdService.newId(),
			"comment": comment,
			"item_id": itemId,
			"owner_id": ownerId,
			"added_date": Date.now()
		};
	}

	function getCommentsByItemId(itemId) {
		var outputArray = [];
		angular.forEach(comments.data, function(comment) {
			if (comment.item_id === itemId) {
				this.push(comment);
			}
		}, outputArray);
		return outputArray;
	}

	function add(comment) {
		comments.data.push(comment);
		saveToStorage();
	}

	function remove(commentId) {
		comments.data.splice(getCommentIdx(commentId), 1);
		saveToStorage();
	}

	function saveToStorage() {
		StorageService.set('comments', comments.data);
	}

	return comments;
}
