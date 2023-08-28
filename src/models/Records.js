const { Schema, model } = require('mongoose');

const record = new Schema({
    // id: String
    title: String,
    artist: String,
    year: Number,
    cover: String,
    price: Number
}, { timestamps: true});

const recordModel = new model('Record', record, 'records');

module.exports = recordModel;