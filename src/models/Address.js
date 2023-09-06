const { Schema, model } = require('mongoose');

const address = new Schema({
    street: String,
    city: String
}, {timestamps: true});

const addressModel = new model('Address', address, 'addresses');

module.exports = { addressModel, address };