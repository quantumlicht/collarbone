var mongoose = require('mongoose');
var BlogPostSchema = require('../schemas/blog_post');

var BlogPost = mongoose.model('BlogPostModel', BlogPostSchema);

module.exports = BlogPost;

// SCHEMA METHODS
// ==============

module.exports.schemaGet = function(req, res) {
  BlogPostModel.find({'key': 1}, function(err, docs){
    if (err) throw err;
    res.send(docs);
  });
};