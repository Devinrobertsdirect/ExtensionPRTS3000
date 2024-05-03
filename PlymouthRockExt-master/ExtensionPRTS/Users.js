// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: String, // Possible values: 'Level 1', 'Level 2', 'Level 3', 'Moderator'
    pin: String,
    ipAddress: String,
    lastLogin: Date,
});

const User = mongoose.model('User', userSchema);
module.exports = User;