require("dotenv").config();

const port = process.env.PORT || 3000;

const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const mongoose = require('mongoose');

const databaseUrl = `${ process.env.DB_URL }${ process.env.DB_NAME }`;
const db = mongoose.connect(databaseUrl);

const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/// Validation

const validator = require('express-validator');

//// Jason Web Token ////

const jwt = require('jsonwebtoken');

const crypto = require('crypto');


// console.log(crypto.randomBytes(64).toString('hex'))

const secret = process.env.TOKEN_SECRET;
/* console.log(secret); */

exports.signAccessToken = data => {
    return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '1800s'});
}

exports.verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        const decodedData = jwt.verify(token, process.env.TOKEN_SECRET);
        next();
    } catch (error) {
        res.status(401).json({ message: "NOT AUTHORIZED" });
    }
}

app.post('/auth', (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username }).then(foundUser => {
        if(foundUser)
        {
            if(foundUser.comparePassword(password))
            {
                res.status(200).json({
                    success: true,
                    token: signAccessToken({ username })
                })
            }
            else
            {
                res.status(401).json({
                    success: false,
                    message: "Incorrect login data"
                })
            }
        }
        else 
        {
            res.status(404).json({
                success: false,
                message: "User not found!"
            })
        }
    });
});


////////// Aufgabe 4: Mongoose / Schema / Modell erstellen 

// importieren der Verbindung zu MongoDB:

// const { connect, closeConnection } = require('./config/db.js');

// importieren der Modelle:

const Order = require('./models/Order.js');
const Record = require('./models/Record.js');
const User = require('./models/User.js');


//// Aufgabe 2:

// cors middleware

const { setCors } = require('./middleware/cors');

app.use(setCors);

////// Aufgabe 3:

const users = require('./routes/users.js');
const orders = require('./routes/orders.js');
const records = require('./routes/records.js');

app.use('/api/users', users);
app.use('/api/orders', orders);
app.use('/api/records', records);



app.use((req, res, next) => {
    const error = new Error("Looks like something is broken...");
    error.statusCode = 404;
    next(error);
});    

app.use((err, req, res, next) => {

    res.status(err.statusCode || 500).send({
        error: {
            message: err.message 
        }    
    });    
});    



////////

app.listen(port, () => console.log("Server läuft auf Port: ", port));

/////////////////

