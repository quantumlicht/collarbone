var mongoose = require('mongoose');
var HintSchema = require('./hint');

var TriviaSchema = new mongoose.Schema({
    title: {type: String, unique: true, required: true},
    hints: [HintSchema],
    author: String,
    userId: String,
    triviaDate: Date
});

module.exports = TriviaSchema;