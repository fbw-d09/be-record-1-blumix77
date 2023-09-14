require('dotenv').config();

const User = require('../models/User.js')

const { connect, closeConnection } = require('../config/db.js');

const validator = require('express-validator');

const jwt = require('jsonwebtoken');

const cookieParser = require('cookie-parser');

const secret = process.env.TOKEN_SECRET;


/* exports.createUser = async (req, res) => {
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
} */

/* exports.updateUser = (req, res) => 
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
} */
// mit Validierung:

exports.createUser = async(req, res, next) => {
    try {
        const {firstname, lastname, username, birthday, mail, password, address} = req.body;

        const error = validator.validationResult(req).errors;
        if(error.length > 0) {
            return res.status(400).json({
                success: false,
                message: error.map(err => err.msg)
            });
        };

        const newUser = new User({firstname, lastname, username, birthday, mail, password, address});
        
        // hinzufügen der Authentifizierung durch ein Login
        newUser.username = username;
        newUser.password = newUser.hashPassword(password);

        await newUser.save();
        res.status(201).json({
            success: true,
            message: `New user ${ username } created`,
            data: newUser
        });
    } catch (error) {
        console.log(error);
        next(error)
    }
}

/// LOGIN MIT JWT

exports.loginUser = async (req, res, next) => {

    try {
        const { username, password } = req.body;
        const user = await User.findOne({username}); //bei .find muss die ID wieder einkommentiert werden
       /*  console.log("user", user[0]); */
        if(user) {
            if(user.comparePassword(password)) {
                const token = jwt.sign({ username, id: user._id }, secret) 

                res
                .cookie('access_token', token ,{
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true
                })
                .status(200)
                .json({
                    success: true,
                    message: `User ${ username } ist eingeloggt`
                })}
            } else {
                res.status(403).json({
                success: false,
                message: "User not found!"
            })
        }
    } catch(err) {
        next(err);
    }
}


exports.updateUser = async(req, res, next) => {
    try {
        const { id } = req.params;

        const updatedUser = req.body;

        const error = validator.validationResult(req).errors;
        if(error.length > 0) {
            return res.status(400).json({
                success: false,
                message: error.map(err => err.msg)
            });
        };

        const user = await User.findByIdAndUpdate(id, updatedUser, 
            {
                new: true
            });
        res.status(201).json({
            message: 'User updated!',
            data: user
        });
    } catch (error) {
        next(error)
    }
};
 

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

exports.getUser = async (req, res) => {
    const { id } = req.params;
    try {
        if (req.loggedInId === id) {
            await User
            .findById(id).populate("address")
            .then(user => {
                res.status(200).json({
                    success: true,
                    id,
                    data: user,
                })    
            })}  
        else {
            res.status(400).json({
                success: false,
                message: "User ist nicht authorisiert."
            })
        }
    } catch {
        (err => console.log(err.message));
    }
};    




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