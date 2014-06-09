var mongoose = require('mongoose');

var BlogPostSchema = new mongoose.Schema({
  key: {type: String, default: null},
  title: {type:String, required: true, unique:true},
  username: {type:String, required: true},
  userId: {type:String, required: true},
  postDate: {type:Date, required: true, default: new Date()},
  content: {type:String, required: true}
});


module.exports = BlogPostSchema;


