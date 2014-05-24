var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    username: String,
    content: String,
    commentDate: Date,
    modelId: String
});

module.exports = CommentSchema;