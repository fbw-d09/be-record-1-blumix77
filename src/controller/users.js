exports.getAllUser = (req, res) => 
{
    res.status(200).send("ALL POSTS")

};

exports.createUser = (req, res) => 
{
    res.status(200).send('Creating a new User!')
}

exports.getUser = (req, res) => 
{
    const { id } = req.params;
    res.status(200).send(`Der User mit der ID "${id}" heißt Günther Miesmuschel mit Mailadresse: mail@mail.de und dem Passwort: 123456.`) 
}

exports.updateUser = (req, res) => 
{
    const { id } = req.params;

    res.status(200).json({
        message: "Der User wurde geupdatet.",
        id
    })
}

exports.deleteUser = (req, res) => 
{
    const { id } = req.params;

    res.status(200).json({
        mesage: "Der User wurde gelöscht.",
        id
    })
}