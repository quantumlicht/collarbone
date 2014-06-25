// API
// ===
var BlogPostModel = require('../models/blog_post');
var CommentModel = require('../models/comment');
var logger = require('../config/config').logger;
var _ = require('underscore');
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
			user_id:req.body.user_id,
			postDate: new Date(),
			content: req.body.content
		});

		return blogPost.save(function(err){
			if (!err) {
				logger.info('blog post created');
				return res.send(blogPost);
			}
			if (err.code === 11000) {
				logger.info('POST /blogposts', 'Conflict', 409);
				res.send('Conflict', 409);
			}
			else {
				if (err.name === 'ValidationError') {
					logger.info('POST /blogposts', 'ValidationError', err);
					return res.send(Object.keys(err.errors).map(function(errField) {
						return err.errors[errField].message;
					}).join('. '), 406);
				}
			}
			return;
		});
	});

	server.put('/blogposts/:id', function(req, res) {
		logger.info('PUT /blogposts/:id');

		var blogpost = _.omit(req.body,['_id']);
		return BlogPostModel.findOneAndUpdate({}, blogpost, function(err, blogPost) {
			if (!err) {
				logger.info( 'BlogPost updated');
				return res.send(blogPost);
			}
			else {
				logger.error('/blogposts/:id','error', err);
			}
		});
	});

	server.delete('/blogposts/:id', function(req, res) {
		logger.info('Deleting BlogPost with id', req.params.id);
		return BlogPostModel.findById(req.params.id, function(err, blogPost) {
			if (!err) {
				return blogPost.remove(function(err) {
					if (!err) {
						logger.info( 'BlogPost deleted');
						return res.send(new BlogPostModel({id:req.params.id}));
					}
					else {
						logger.info(err);
					}
				});
			}
			else {
				logger.info(err);
			}
		});
	});
}

