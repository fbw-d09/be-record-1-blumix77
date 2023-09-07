const { Schema, model } = require('mongoose');

const addressProfileSchema = new Schema({
    street: String,
    city: String
}, 
{timestamps: true,
_id: false
});

const addressModel = new model('Address', addressProfileSchema , 'addresses');

module.exports = { addressProfileSchema, addressModel };