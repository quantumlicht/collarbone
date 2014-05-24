var mongoose = require('mongoose');
var HintSchema = require('./hint');

var TriviaSchema = new mongoose.Schema({
    title: String,
    hints: [HintSchema],
    author: String,
    triviaDate: Date
});

module.exports = TriviaSchema;