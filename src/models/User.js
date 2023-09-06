const mongoose = require("mongoose")
/* const address = require("./Address.js"); */


const { Schema, model } = require('mongoose');

const address = new Schema({
    street: String,
    city: String
}, {timestamps: true});

const user = new Schema({
    firstname: {type: String, trim: true},
    lastname: {type: String, trim: true},
    birthday: {
        day: Number,
        month: Number,
        year: Number
    },
    mail: String,
    password: {type: String, required: true },
    address: address
}, {timestamps: true});

const userModel = new model('User', user, 'users');

module.exports = userModel;