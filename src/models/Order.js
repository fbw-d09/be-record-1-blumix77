const mongoose = require("mongoose")
const { recordSchema } = require("./Record.js"); 

const { Schema, model } = require('mongoose');

const order = new Schema({
    quantity: Number,
    records: [{
        type: Schema.Types.ObjectId,
        ref: "Record", 
        // quantity: Number
    }]
}, { timestamps: true });

const orderModel = new model('Order', order, 'orders');

module.exports = orderModel;