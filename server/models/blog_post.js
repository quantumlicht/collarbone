var mongoose = require('mongoose');

var BlogPostSchema = require('../schemas/blog_post');

var BlogPost = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPost;
