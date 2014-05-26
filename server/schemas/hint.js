var mongoose = require('mongoose');

var HintSchema = new mongoose.Schema({
   hint: String
});

module.exports = HintSchema;