const mongoose = require('mongoose');
const validator = require('validator');

var User = mongoose.model('User', {
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    surname: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    role: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    grade: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    language: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
}, "users");

module.exports = { User };