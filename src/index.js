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

// POST 

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

/* create({
    id: 1,
    title: "testTitle",
    artist: "testArtist",
    year: "1978",
    cover: "DefaultCover",
    price: "3.5664€"
})

create({
    id: 2,
    title: "testTitle2",
    artist: "testArtist2",
    year: "1979",
    cover: "DefaultCover",
    price: "18€"

}) */

create({
    id: 3,
    title: "testTitle3",
    artist: "testArtist3",
    year: "2000",
    cover: "DefaultCover",
    price: "20€"

})

// GET 

const readOne = (id) => 
{
    const selectedRecord = db.get("records").find({ id }).value();

    console.log("Einzelner ausgegebener Eintrag:", selectedRecord);

}

// UPDATE / PUT 

const update = (id, title, artist, year, cover, price) => 
{
    db.get("records").find({ id })

    .assign({ title, artist, year, cover, price }).write();

    console.log("Update erfolgreich!");
}

// update(1, "dasdasd"); 

// DELETE 

const remove = (id) => 
{

    db.get("records").remove({ id }).write();

    console.log(`Record mit der ID: ${id} wurde gelöscht!`)

}

// remove(1)

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
    // res.status(200).json(`New Record ${newRecord} added!`)
    const { record } = req.body;

    res,send(record);


});

app.listen(port, () => console.log("Server läuft auf Port: ", port));


