const mongoose = require("mongoose")
const { addressProfileSchema } = require("./Address.js");
const { Schema, model } = require('mongoose');

const user = new Schema({
    firstname: {type: String, trim: true},
    lastname: {type: String, trim: true},
    username: { type: String, unique: true, trim: true, required: true},
    birthday: {
        day: Number,
        month: Number,
        year: Number
    },
    mail: String,
    password: {type: String, required: true },
    address: addressProfileSchema
}, {timestamps: true});






const userModel = new model('User', user, 'users');

module.exports = userModel;