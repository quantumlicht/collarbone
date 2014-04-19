var mongoose = require('mongoose');

var KeywordSchema = new mongoose.Schema({
	keyword: String
});

module.exports = KeywordSchema;