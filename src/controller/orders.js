exports.getAllOrders = (req, res) => 
{
    res.status(200).send("ALL ORDERS")
}

exports.createNewOrder = (req, res) => 
{
    res.status(200).json("Creating a new Order")
}

exports.getOrder = (req, res) => 
{
    const { id } = req.params;

    res.status(200).json({
        message: `Deine Bestellung wird hier angezeigt`,
        quantity: "3000",
        id
    })
}

exports.updateOrder = (req, res) => 
{
    const { id } = req.params;

    res.status(200).json({
        message: `Die Bestellung wurde aktualisiert.`,
        quantity: "3000",
        id
    })
}

exports.deleteOrder = (req, res) => 
{
    const { id } = req.params;

    res.status(200).json({
        message: "Die Bestellung wurde gelöscht!",
        quantity: "3000",
        id
    })
}