const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, unique:true, required: true},
    password: {type: String, required: true},
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema)
module.exports = User