	// COMMENTS
var CommentModel = require('../models/comment');
var logger = require('../config/config').logger;
_ = require('underscore');
module.exports = function(server){
	
	server.get('/comments', function(req, res) {
		logger.info('GET /comments');
		return CommentModel.find(function(err, comments) {
			if (!err) {
				return res.send(comments);
			}
			else {
				logger.info(err);
			}
		});
	});

	// server.get('/comments/model/:id', function(req, res) {
	// 	logger.info('GET /comments/model/:id');
	// 	return CommentModel.find({modelId:req.params.id}, function(err, comments) {
	// 		if (!err) {
	// 			return res.send(comments);
	// 		}
	// 		else {
	// 			logger.info(err);
	// 		}
	// 	});
	// });

	// server.get('/comments/:id', function(req, res){
	// 	logger.info('GET /comments/:id');
	// 	return CommentModel.findByID(req.params.id, function(err, comment) {
	// 		if (!err) {
	// 			return res.send(comment);
	// 		}
	// 		else {
	// 			logger.info(err);
	// 		}
	// 	});
	// });
	
	// server.get('/comments/:id/edit', function(req, res) {
	// 	CommentModel.findById(req.params.id, function(err, comment){
	// 		if (!err) {
	// 			res.send(comment);
	// 		}
	// 		else {
	// 			logger.info(err);
	// 		}
	// 	});
	// });

	server.put('/comments/:id', function(req, res) {
		logger.info('PUT /comments/:id', 'req.body', req.body);
		comment = _.omit(req.body,['_id']);
		return CommentModel.update({_id:req.body.id}, comment, function(err, rows, resp) {
			if (!err) {
				logger.info( 'comment updated');
				return res.send(req.body);
			}
			else {
				logger.info(err);
			}
		});
	});

	server.post('/comments', function(req, res) {
		logger.info('POST /comments', req.body);
		var comment = new CommentModel({
			username: req.body.username,
			content: req.body.content,
			user_id: req.body.user_id,
			commentDate: new Date(),
			modelId: req.body.modelId,
			modelUrl: req.body.modelUrl
		});

		return comment.save(function(err){
			if (!err) {
				logger.info('comment created');
				return res.send(comment);
			}
			else {
				logger.info(err);
			}
		});
	});

	server.delete('/comments/:id', function(req, res) {
		return CommentModel.findById(req.params.id, function(err, comment){
			comment.remove(function(err){
				if (!err) {
					logger.info ('DELETE /comments/:id', 'comment deleted');
					return res.send(comment);
				}
				else {
					logger.info(err);
				}
			});
		});
		logger.info('DELETE /comments/:id', 'Deleting BlogPost with id', req.params.id, req.params.commentId);
	});
}