var TriviaModel = require('../models/trivia');
var CommentModel = require('../models/comment');
module.exports = function(server) {

	server.get('/trivia', function(req, res){
		return TriviaModel.find( function(err, trivia) {
			if (!err) {
				return res.send(trivia);
			}
			else {
				return console.log(err);
			}
		});	
	});

	server.post('/trivia', function(req, res) {
		console.log('POST /trivia', 'req.body', req.body);
		var trivia = new TriviaModel({
			title: req.body.title,
			userId: req.body.userId,
			author: req.body.author,
			triviaDate: new Date(),
			hints: req.body.hints
		});
		console.log('/trivia', 'req.body.hints', req.body.hints);
		return trivia.save(function(err){
			if (!err) {
				console.log('trivia created');
				return res.send(trivia);
			}
			else {
				console.log(err);
			}
		});
	});

	server.get('/trivia/:id', function(req, res) {
		console.log('/trivia:id','id', req.params.id );
		return TriviaModel.findById(req.params.id, function(err, trivia) {
				if (!err) {
					return res.send(trivia);
				}
				else {
					console.log(err);
				}
		});
	});

	// server.get('/trivia/:id/comments', function(req, res) {
	// 	return CommentModel.find({modelId: req.params.id},function(err, comments) {
	// 		if (!err) {
	// 			return res.send(comments);
	// 		}
	// 		else {
	// 			console.log(err);
	// 		}
	// 	});
	// });


	// server.post('/trivia/:id/comments', function(req, res) {
	// 	var comment = new CommentModel({
	// 		username: req.body.username,
	// 		content: req.body.content,
	// 		userId: req.body.userId,
	// 		commentDate: req.body.commentDate,
	// 		modelId: req.params.id
	// 	});

	// 	return comment.save(function(err){
	// 		if (!err) {
	// 			console.log('comment created', comment);
	// 			return res.send(comment);
	// 		}
	// 		else {
	// 			console.log(err);
	// 		}
	// 	});
	// });

}		