
const { Schema, model } = require('mongoose');

const user = new Schema({
    firstname: {type: String, trim: true},
    lastname: {type: String, trim: true},
    birthday: {
        day: Number,
        month: Number,
        year: Number
    },
    mail: String,
    password: {type: String, unique: true, required: true }
}, {timestamps: true});

const userModel = new model('User', user, 'users');

module.exports = userModel;