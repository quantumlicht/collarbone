var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    username: {type: String, required:true},
    userId: {type:String, required: true},
    content: {type: String, required: true},
    commentDate: {type:Date, required:true, default: new Date()},
    modelUrl: {type:String, required:true},
    modelId: {type:String, required:true}
});

module.exports = CommentSchema;