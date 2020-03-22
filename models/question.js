const mongoose = require('mongoose');

var Question = mongoose.model('Question', {
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    question: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    optiona: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    optionb: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    optionc: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    optiond: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    correctAnswer: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
}, "questions");

module.exports = { Question };