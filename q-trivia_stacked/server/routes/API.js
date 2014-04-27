// API
// ===
var BlogPostModel = require('../models/blog_post');
module.exports.api = function(server) {

	// Sample Rest Call

	server.get('/api/blogposts', function(req, res){
		return BlogPostModel.find( function(err, blogPosts) {
			if (!err) {
				return res.send(blogPosts);
			}
			else {
				return console.log(err);
			}
		});
	});

	server.post( '/api/blogposts', function(req, res) {
		var blogPost = new BlogPostModel({
			title: req.body.title,
			author: req.body.author,
			postDate: req.body.postDate,
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

	server.get('api/blogposts/:id', function(req, res) {
		return BlogPostModel.findById(req.params.id,function(err, blogPost) {
			if (!err) {
				return res.send(blogPost);
			}
			else {
				console.log(err);
			}
		});
	});

	server.put('/api/blogposts/:id', function(req, res) {
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

	server.delete('/api/blogposts/:id', function(req, res) {
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
}
