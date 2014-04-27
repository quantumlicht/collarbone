// DEPENDENCIES
// ============

var mongoose =     require('mongoose'),
    Schema =     mongoose.Schema,
    objectID =     Schema.ObjectID;

// USER ACCOUNT SCHEMA
// ===================

var BlogPostSchema = new Schema({
  key: {type: String, default: null},
  title: String,
  author: String,
  postDate: Date,
  content: String
});

// CREATE DATABASE MODEL
// =====================

module.exports = BlogPostSchema;


