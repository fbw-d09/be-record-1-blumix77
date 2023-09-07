require('dotenv').config();

const Order = require('../models/Order.js');

const { connect, closeConnection } = require('../config/db.js');

exports.getAllOrders = (req, res) => {
    Order
    .find().populate("records","-_id")
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
    .findById(id).populate("records",'title artist -_id')
    .then(order => {
        res.status(200).json({
            success: true,
            id,
            data: order,
        })
    })
    .catch(err => console.log(err.message));
}

exports.createNewOrder = async (req, res) => {
    // const { artist, title, quantity } = req.body;
    try {
        const newOrder = new Order(req.body);
        await newOrder.save() 
        res.status(200).json({
            success: true,
            data: newOrder
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        })
    }
}

exports.updateOrder = (req, res) => {
    const { id } = req.params;
    const updatedOrder = req.body;
    Order
    .findByIdAndUpdate(id, updatedOrder,{new:true})
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
    .findOneAndReplace(id)
    .then(order => {
        res.json({
            success: true,
            deleted: order !== null ? true : false, 
            data: order
        });
    });
}