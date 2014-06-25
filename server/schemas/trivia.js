var mongoose = require('mongoose');
var HintSchema = require('./hint');

var TriviaSchema = new mongoose.Schema({
    title: {type: String, unique: true, required: true},
    hints: [HintSchema],
    username: {type:String, required:true},
    user_id: {type:String, required:true},
    triviaDate: {type:Date, required:true, default: new Date()}
});

module.exports = TriviaSchema;