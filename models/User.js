const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // avatar: {
    //     type: String
    // },
    date: {
        type: Date,
        default: Date.now
    },
    user_type: {
        type: String,
        required: true
    },
    orders: {
        type: [Number],
        required: false
    },
    resetPasswordToken: {
        type: String,
        default:"."
    },
    resetPasswordExpires: {
        type: String
    },
});


const User = mongoose.model('users', UserSchema);

module.exports = User;