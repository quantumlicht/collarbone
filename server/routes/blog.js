// API
// ===
var BlogPostModel = require('../models/blog_post');
var CommentModel = require('../models/comment');
module.exports = function(server) {

	// Sample Rest Call

	server.get('/blogposts', function(req, res){
		return BlogPostModel.find( function(err, blogPosts) {
			if (!err) {
				return res.send(blogPosts);
			}
			else {
				return console.log(err);
			}
		});	
	});

	server.post('/blogposts', function(req, res) {
		var blogPost = new BlogPostModel({
			title: req.body.title,
			author: req.body.author,
			postDate: new Date(),
			content: req.body.content
		});

		return blogPost.save(function(err){
			if (!err) {
				console.log('blog post created');
				return res.send(blogPost);
			}
			else {
				console.log(err);
			}
		});
	});

	server.put('/blogposts/:id', function(req, res) {
		console.log('Updating BlogPost', req.body.title);
		return BlogPostModel.findById(req.params.id, function(err, blogPost) {
			blogPost.title = req.body.title;
			blogPost.author = req.body.author;
			blogPost.postDate = req.body.postDate;
			blogPost.content = req.body.content;
			return blogPost.save(function(err) {
				if (!err) {
					console.log( 'BlogPost updated');
					return res.send(blogPost);
				}
				else {
					console.log(err);
				}
			})
		});
	});

	server.delete('/blogposts/:id', function(req, res) {
		console.log('Deleting BlogPost with id', req.params.id);
		return BlogPostModel.findById(req.params.id, function(err, blogPost) {
			return blogPost.remove(function(err) {
				if (!err) {
					console.log( 'BlogPost updated');
					return res.send('');
				}
				else {
					console.log(err);
				}
			});
		});
	});


	// COMMENTS

	server.get('/blogposts/:id/comments', function(req, res) {
		return CommentModel.find({modelId: req.params.id},function(err, comments) {
			if (!err) {
				return res.send(comments);
			}
			else {
				console.log(err);
			}
		});
	});

	server.post('/blogposts/:id/comments', function(req, res) {
		var comment = new CommentModel({
			username: req.body.username,
			content: req.body.content,
			commentDate: new Date(),
			modelId: req.params.id
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

}

