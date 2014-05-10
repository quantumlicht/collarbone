var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    username: String,
    content: String,
    commentDate: Date,
    blogPostId: String
});

module.exports = CommentSchema;