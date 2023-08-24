require("dotenv").config();

const port = process.env.Port || 3000;

const express = require('express');

const bodyParser = require('body-parser');

const low = require('lowdb');

const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');

const db = low(adapter);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//// Aufgabe 2:

// cors middleware

const { setCors } = require('./middleware/cors');

// app.use(meineMiddleware);

app.get("/api/records/middleware", setCors, (req,res) => {
    console.log("das ist der test");
    res.send("Middleware-Test");
})

////

app.get("/api/records", (req, res) => 
{   

    console.log("METHOD:", req.method);
    const selectedRecord = db.get("records").value();
    res.status(200).json({success: true, selectedRecord });

});

app.post("/api/records", (req, res) => 
{   

    console.log("METHOD:", req.method);

    // res.status(200).json(`New Record ${newRecord} added!`)
    const { id, title, artist, year, cover, price } = req.body;
    const newArtist = { id, title, artist, year, cover, price }

    db.get("records").push( newArtist ).write();

    res.status(200).json({ success: true, data: newArtist})
});

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


//////

app.listen(port, () => console.log("Server läuft auf Port: ", port));


