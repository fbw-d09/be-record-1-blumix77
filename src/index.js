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


const create = ({ id, title, artist, year, cover, price }) => 
{
    const newRecord = {
        id,
        title,
        artist,
        year,
        cover,
        price
    }

    db.get("records").push(newRecord).write();

    console.log("Eintrag erstellt:", newRecord);
}

create({
    id: 1,
    title: "testTitle",
    artist: "testArtist",
    year: "1978",
    cover: "DefaultCover",
    price: "3.5664€"

})




app.get("/api/records", (req, res) => 
{   

    console.log("METHOD:", req.method);

    const { newRecord } = req.body;


    res.status(200).json({ success: true, data: []})


});

app.post("/api/records", (req, res) => 
{   

    console.log("METHOD:", req.method);


    res.status(200).json({ success: true, data: []})


});

app.listen(port, () => console.log("Server läuft auf Port: ", port));


