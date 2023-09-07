const { Schema, model } = require('mongoose');

const recordSchema = new Schema({
    title: String,
    artist: String,
    year: Number,
    cover: String,
    price: Number,
    // quantity: Number
}, { timestamps: true});

const Record = new model('Record', recordSchema, 'records');

module.exports = { recordSchema, Record };