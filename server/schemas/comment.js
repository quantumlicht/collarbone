var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    username: String,
    userId: String,
    content: String,
    commentDate: Date,
    modelId: String
});

module.exports = CommentSchema;