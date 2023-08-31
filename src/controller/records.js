require('dotenv').config();

const Record = require('../models/Record.js')

const { connect, closeConnection } = require('../config/db.js');


exports.getAllRecords = (req, res) => {
    Record
    .find()
    .then(records => {
        res.status(200).json(
        {
            success: true,
            data: records
        }
    )
    })
    .catch(err => console.log(err.message));
}

exports.getRecord = (req, res) => {
    const { id } = req.params;
    Record
    .findById(id)
    .then(record => {
        res.status(200).json({
            success: true,
            id,
            data: record,
        })
    })
    .catch(err => console.log(err.message));
} 

exports.createNewRecord = async (req, res) => {
    try {
        const newRecord = new Record(req.body);
        await newRecord.save()
        res.status(200).json({
            success: true,
            data: newRecord,
            message: "Der Recordeintrag wurde erstellt!"
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        })
    }
}


exports.updateRecord = (req, res) => {
    const { id } = req.params;
    Record
    .findOneAndUpdate({ _id:id },
        {
            artist: req.body.artist,
            title: req.body.title,
            year: req.body.year,
            cover: req.body.cover
        })
    .then(record => {
            res.status(200).json({
                success: true,
                replaced: order !== null ? true : false,
                data: record,
                message: "Das Record wurde geupdated."
            })
    });
};

exports.deleteRecord = (req, res) => {
   const { id } = req.params;
   Record
   .findByIdAndDelete(id)
   .then(record => {
       res.status(200).json({
            success: true,
            deleted: record !== null ? true : false,
            data: record,
            message: "Das Record wurde gelöscht."
        });
    });
}