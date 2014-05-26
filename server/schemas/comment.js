var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    username: String,
    userId: String,
    content: {type: String, required: true},
    commentDate: Date,
    modelId: String
});

module.exports = CommentSchema;