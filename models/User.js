const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true, //delete white space
        lowercase: true
    },
    password: String
});

const User = mongoose.model('User', UserSchema);

module.exports = User;