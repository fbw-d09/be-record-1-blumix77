
const { Schema, model } = require('mongoose');

const user = new Schema({
    // id: String,
    firstname: String,
    lastname: String,
    mail: String,
    password: {type: String, unique: true, required: true }
}, {timestamps: true});

const userModel = new model('User', user, 'users');

module.exports = userModel;