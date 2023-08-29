// Aufgabe 4 - Daten mittels Chance durch Modelle / Schemas in eine Datenbank implementieren - pure JS / kein Express 

const Chance = require('chance');
const mongoose = require('mongoose')

const { connect, closeConnection } = require('./config/db.js');

const Order = require('./models/Order.js');
const Record = require('./models/Record.js');
const User = require('./models/User.js');

const chance = new Chance();

const generateUsers = (num) => {
    const users = [];

    for(let i = 0; i < num; i++) {
        const firstname = chance.first();
        const lastname = chance.last();
        const mail = chance.email();
        const password = chance.hash({length: 10})

        users.push({
            firstname,
            lastname,
            mail,
            password
        });
    }
    return users;
};

////

const generateOrders = (num) => {
    const orders = [];

    for(let i = 0; i < num; i++) {
        const artist = chance.string();
        const title = chance.string();
        const quantity = chance.natural({min: 1, max: 20});

        orders.push({
            artist,
            title,
            quantity
        });
    }
    return orders;
};

//// 

const generateRecords = (num) => {
    const records = [];

    for(let i = 0; i < num; i++) {
       const title = chance.string();
       const artist = chance.string();
       const year = chance.natural({min: 1910, max: 2023});
       const cover = chance.string();
       const price = chance.natural({min: 1, max: 2000});

       records.push({
        title,
        artist,
        year,
        cover,
        price
       });
    }
    return records;
}

const seed = async () => {

    await connect().then(async () => {
    /*     const newUser = new Users({
            firstname: chance.first(),
            lastname: chance.last(), mail: chance.email(), password: chance.hash({ length: 10 }) */
        await User
        .insertMany(generateUsers(10))
        .then(docs => {
            console.log(docs);
        })
        .catch (err => {
            console.log(err.message);
        }) 
        await Order
        .insertMany(generateOrders(5))
        .then(docs => {
            console.log(docs);
        })
        .catch (err => {
            console.log(err.message);
        })
        await Record
        .insertMany(generateRecords(8))
        .then(docs => {
            console.log(docs);
        })
        .catch (err => {
            console.log(err.message);
        })
    });
    await closeConnection();
}

seed();

