exports.getAllOrders = (req, res) => 
{
    res.status(200).send("ALL ORDERS")
}

exports.createNewOrder = (req, res) => 
{
    res.status(200).send("Creating a new Order")
}

exports.getOrder = (req, res) => 
{
    const { id } = req.params;
    res.status(200).send(`Die Bestellung mit der ID "${id}" wird hier angezeigt.`);
}

exports.updateOrder = (req, res) => 
{
    const { id } = req.params;

    res.status(200).json({
        message: `Die Bestellung wurde aktualisiert.`,
        id
    })
}

exports.deleteOrder = (req, res) => 
{
    const { id } = req.params;

    res.status(200).json({
        message: "Die Bestellung wurde gelöscht!",
        id
    })
}