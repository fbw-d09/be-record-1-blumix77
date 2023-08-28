const Chance = require('chance');
const mongoose = require('mongoose')

const { connect, closeConnection } = require('./config/db.js');

const Orders = require('./models/Orders.js');
const Records = require('./models/Records.js');
const Users = require('./models/Users.js');

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

const seed = async () => {

    await connect().then(async () => {
    /*     const newUser = new Users({
            firstname: chance.first(),
            lastname: chance.last(), mail: chance.email(), password: chance.hash({ length: 10 }) */
        await Users
        .insertMany(generateUsers(10))
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

