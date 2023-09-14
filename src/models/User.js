const mongoose = require("mongoose")
const { addressProfileSchema } = require("./Address.js");
const { Schema, model } = require('mongoose');
const crypto = require('crypto');
const secret = process.env.TOKEN_SECRET;


const userSchema = new Schema({
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


userSchema.methods.hashPassword = (password) => {
    return crypto.createHmac('sha256', secret).update(password).digest('hex');
}

userSchema.methods.comparePassword = function (loginPassword)
{
    if(this.password !== this.hashPassword(loginPassword))
    {
        return false;
    }

    return true;
}


const userModel = new model('User', userSchema, 'users');

module.exports = userModel;