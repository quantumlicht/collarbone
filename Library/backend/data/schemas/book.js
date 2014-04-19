var mongoose = require('mongoose');
var KeywordSchema = require('./keyword');

var BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    releaseDate: Date,
    keywords: [KeywordSchema]
});

module.exports = BookSchema;