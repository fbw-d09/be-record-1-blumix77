require('dotenv').config();

const Order = require('../models/Order.js');

const { connect, closeConnection } = require('../config/db.js');

exports.getAllOrders = (req, res) => {
    Order
    .find()
    .then(orders => {
        res.status(200).json(
        {
            success: true,
            data: orders
        }
    )
    })
    .catch(err => console.log(err.message));
}

exports.getOrder = (req, res) => {
    const { id } = req.params;
    Order
    .findById(id)
    .then(order => {
        res.status(200).json({
            success: true,
            id,
            data: order,
        })
    })
    .catch(err => console.log(err.message));
}

exports.createNewOrder = (req, res) => {

    const { artist, title, quantity } = req.body;

    try {
        connect().then(async => {
            const newOrder = new Order({
                artist,
                title,
                quantity
            })
            console.log(newOrder);

            newOrder
            .save()
            .then(order => {
                res.status(201).json({
                    success: true,
                    data: order
                });
            })
            .catch(err => {
                res.status(400).json({
                    success: false,
                    message: err.message
                })
            })
        })

    } catch(err) {
        console.log(err.message);
    }
}

exports.updateOrder = (req, res) => {
    const { id } = req.params;
    Order
    .findOneAndReplace({ _id: id },
    {
        quantity: 130,
        artist: "Peter Pain",
        title: "Klick Klack"
    })
    .then(order => {
        res.status(200).json({
            success: true,
            replaced: order !== null ? true : false,
            data: order,
            message: `Die Bestellung wurde aktualisiert.`,
        });
    });
};

exports.deleteOrder = (req, res) => {
    const { id } = req.params;
    Order
    .findByIdAndDelete(id)
    .then(order => {
        res.json({
            success: true,
            deleted: order !== null ? true : false, 
            data: order
        });
    });
}