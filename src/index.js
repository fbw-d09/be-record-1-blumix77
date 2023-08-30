require("dotenv").config();

const port = process.env.PORT || 3000;

const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const mongoose = require('mongoose');

const databaseUrl = `${ process.env.DB_URL }${ process.env.DB_NAME }`;
const db = mongoose.connect(databaseUrl);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
    const error = new Error("Looks like something is broke...");
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

