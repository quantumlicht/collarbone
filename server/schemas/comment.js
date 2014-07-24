var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    username: {type: String, required:true},
    user_id: {type:String, required: true},
    content: {type: String, required: true},
    accepted_answer:{type: Boolean, required:false},
    commentDate: {type:Date, required:true, default: new Date()},
    modelUrl: {type:String, required:true},
    modelId: {type:String, required:true}
});

module.exports = CommentSchema;