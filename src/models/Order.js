const mongoose = require("mongoose")
const { Record } = require("./Record.js"); 

const { Schema, model } = require('mongoose');

const order = new Schema({
    artist: String,
    title: String,
    quantity: Number,
    records: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Record",
        required: true
    }]
}, { timestamps: true });

const orderModel = new model('Order', order, 'orders');

module.exports = orderModel;