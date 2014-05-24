// DEPENDENCIES
// ============

var mongoose = require('mongoose');

// USER ACCOUNT SCHEMA
// ===================

var BlogPostSchema = new mongoose.Schema({
  key: {type: String, default: null},
  title: String,
  author: String,
  postDate: Date,
  content: String
});

// CREATE DATABASE MODEL
// =====================

module.exports = BlogPostSchema;


