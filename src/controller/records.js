exports.createNewRecord = (req, res) => 
{
    res.status(200).send(`Record hinzugefügt!`);
}

exports.getAllRecords = (req, res) => 
{
    res.status(200).json(`Get All Records`);
}


exports.getPost = (req, res) => 
{
    const { id } = req.params;

    res.status(200).send(`Der Record mit der id "${id}" wird hier angezeigt`);

} 

exports.updatePost = (req, res) => {
    
    const { id } = req.params;
    
    res.status(200).json({
        message: `Der Record mit der id ${id} wurde geupdatet.`,
        id
    });
}

exports.deletePost = (req, res) => {

    const { id } = req.params;

    res.status(200).json({
        message: `Der Record mit der id "${id}" wurde gelöscht.`,
        id
    })
}