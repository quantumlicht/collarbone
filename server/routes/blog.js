// API
// ===
var BlogPostModel = require('../models/blog_post');
var CommentModel = require('../models/comment');
var logger = require('../config/config').logger;
module.exports = function(server) {

	// Sample Rest Call

	server.get('/blogposts', function(req, res){
		logger.info('GET /blogposts');
		return BlogPostModel.find( function(err, blogPosts) {
			if (!err) {
				return res.send(blogPosts);
			}
			else {
				return logger.error(err);
			}
		});	
	});

	server.post('/blogposts', function(req, res) {
		logger.info('POST /blogposts');
		var blogPost = new BlogPostModel({
			title: req.body.title,
			username: req.body.username,
			userId:req.body.userId,
			postDate: new Date(),
			content: req.body.content
		});

		return blogPost.save(function(err){
			if (!err) {
				logger.info('blog post created');
				return res.send(blogPost);
			}
			else {
				logger.error(err);
			}
		});
	});

	server.put('/blogposts/:id', function(req, res) {
		logger.info('PUT /blogposts/:id', req.body.title);
		return BlogPostModel.findById(req.params.id, function(err, blogPost) {
			blogPost.title = req.body.title;
			blogPost.username = req.body.username;
			blogPost.postDate = new Date(req.body.postDate);
			blogPost.content = req.body.content;
			return blogPost.save(function(err) {
				if (!err) {
					logger.info( 'BlogPost updated');
					return res.send(blogPost);
				}
				else {
					logger.error(err);
				}
			})
		});
	});

	server.delete('/blogposts/:id', function(req, res) {
		logger.info('Deleting BlogPost with id', req.params.id);
		return BlogPostModel.findById(req.params.id, function(err, blogPost) {
			return blogPost.remove(function(err) {
				if (!err) {
					logger.info( 'BlogPost deleted');
					return res.send(new BlogPostModel({id:req.params.id}));
				}
				else {
					logger.info(err);
				}
			});
		});
	});


	// COMMENTS

	// server.get('/blogposts/:id/comments', function(req, res) {
	// 	return CommentModel.find({modelId: req.params.id},function(err, comments) {
	// 		if (!err) {
	// 			return res.send(comments);
	// 		}
	// 		else {
	// 			logger.info(err);
	// 		}
	// 	});
	// });

	// server.post('/blogposts/:id/comments', function(req, res) {
	// 	var comment = new CommentModel({
	// 		username: req.body.username,
	// 		content: req.body.content,
	// 		commentDate: new Date(),
	// 		modelId: req.params.id
	// 	});

	// 	return comment.save(function(err){
	// 		if (!err) {
	// 			logger.info('comment created', comment);
	// 			return res.send(comment);
	// 		}
	// 		else {
	// 			logger.info(err);
	// 		}
	// 	});
	// });

	// server.delete('/blogposts/:id/comments/:commentId', function(req, res) {
	// 	logger.info('Deleting BlogPost with id', req.params.id, req.params.commentId);
	// });

}

