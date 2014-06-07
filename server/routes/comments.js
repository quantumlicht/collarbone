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

	server.put('/comments/:id', function(req, res) {
			return CommentModel.findById(req.params.id, function(err, comment) {
			comment.content = req.body.content;
			return comment.save(function(err) {
				if (!err) {
					console.log( 'comment updated');
					return res.send(comment);
				}
				else {
					console.log(err);
				}
			})
		});
	});

	server.get('/comments/model/:id', function(req, res) {
		return CommentModel.find({modelId:req.params.id}, function(err, comments) {
			if (!err) {
				return res.send(comments);
			}
			else {
				console.log(err);
			}
		});
	});

	server.get('/comments/:id', function(req, res){
		return CommentModel.findByID(req.params.id, function(err, comment) {
			if (!err) {
				return res.send(comment);
			}
			else {
				console.log(err);
			}
		});
	});


	server.get('/comments/:id/edit', function(req, res) {
		CommentModel.findById(req.params.id, function(err, comment){
			if (!err) {
				res.send(comment);
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
			modelId: req.body.modelId,
			modelUrl: req.body.modelUrl
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
		return CommentModel.findById(req.params.id, function(err, comment){
			comment.remove(function(err){
				if (!err) {
					console.log ('DELETE /comments/:id', 'comment deleted');
					return res.send(comment);
				}
				else {
					console.log(err);
				}
			});
		});
		console.log('DELETE /comments/:id', 'Deleting BlogPost with id', req.params.id, req.params.commentId);
	});
}