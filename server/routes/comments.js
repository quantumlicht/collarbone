	// COMMENTS
var CommentModel = require('../models/comment');
module.exports = function(server){
	
	server.get('/comments', function(req, res) {
		return CommentModel.find(function(err, comments) {
			if (!err) {
				return res.send(comments);
			}
			else {
				console.log(err);
			}
		});
	});

	server.post('/comments', function(req, res) {
		console.log('POST /comments', req.body);
		var comment = new CommentModel({
			username: req.body.username,
			content: req.body.content,
			commentDate: new Date(),
			modelId: req.body.modelId
		});

		return comment.save(function(err){
			if (!err) {
				console.log('comment created', comment);
				return res.send(comment);
			}
			else {
				console.log(err);
			}
		});
	});

	server.delete('/comments/:id', function(req, res) {
		console.log('Deleting BlogPost with id', req.params.id, req.params.commentId);
	});
}