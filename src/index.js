// require("dotenv").config();

const port = 3000;

const express = require('express');

const bodyParser = require('body-parser');

const low = require('lowdb');

const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');

const db = low(adapter);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Aufgabe 2:

// cors middleware

const { meineMiddleware } = require('./middleware/cors');

app.use(meineMiddleware);

//

app.delete("/api/records/delete/:id", async (req, res) => {

    console.log("METHOD: ", req.method);
    const { id } = req.params;
    console.log(id);
    await db.get("records").remove({id: 2}).write();
    //console.log(req.params.id);
    res.status(200).json({ success: true })
})

app.get("/api/records", (req, res) => 
{   

    console.log("METHOD:", req.method);

    const { newRecord } = req.body;

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





app.listen(port, () => console.log("Server läuft auf Port: ", port));


