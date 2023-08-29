
const { Schema, model } = require('mongoose');

const order = new Schema({
    // id: String
    artist: String,
    title: String,
    quantity: Number
}, { timestamps: true });

const orderModel = new model('Order', order, 'orders');

module.exports = orderModel;