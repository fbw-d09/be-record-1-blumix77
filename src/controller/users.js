require('dotenv').config();

const User = require('../models/User.js')

const { connect, closeConnection } = require('../config/db.js');


exports.getAllUser = (req, res) => 
{
    User
    .find()
    .then(users => {
        res.status(200).json(
            {
                success: true,
                data: users
            }
        )
    })
    .catch(err => console.log(err.message));
};

exports.getUser = (req, res) => 
{
    const { id } = req.params;
    User
    .findById(id)
    .then(user => {
        res.status(200).json({
            success: true,
            id,
            data: user,
        })
    })
    .catch(err => console.log(err.message));
}



exports.createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save()
        res.status(200).json({
            success: true,
            data: newUser,
            message: "Der neue User wurde angelegt!"
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        })
    }
}

exports.updateUser = (req, res) => 
{
    const { id } = req.params;
    User
    .findOneAndUpdate({ _id:id },
        {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            birthday:{
                day: req.body.birthday.day,
                month: req.body.birthday.month,
                year: req.body.birthday.year
            },
            mail: req.body.mail,
            password: req.body.password
        })
    .then(user => {
            res.status(200).json({
                success: true,
                replaced: user !== null ? true : false,
                data: user,
                message: "Der User wurde geupdated."
            })
    });
}

exports.deleteUser = (req, res) => {
    const { id } = req.params;
    User
    .findByIdAndDelete(id)
    .then(user => {
        res.status(200).json({
             success: true,
             deleted: user !== null ? true : false,
             data: user,
             message: "Der User wurde gelöscht."
         });
     });

}