var mongoose = require('mongoose');

var TriviaSchema = require('../schemas/trivia');

var Trivia = mongoose.model('Trivia', TriviaSchema);

module.exports = Trivia;