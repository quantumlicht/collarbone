var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    auth_token: {type: String, unique:true}
});

module.exports = UserSchema;