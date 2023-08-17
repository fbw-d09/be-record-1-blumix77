exports.getPost = (req, res) => 
{
    const { id } = req.params;

    res.status(200).send(`Der Record mit der id "${id}" wird hier angezeigt`);

} 

exports.updatePost = (req, res) => {
    
    const { id } = req.params;
    
    res.status(200).json({
        message: `Der Record mit der "${id}" wurde geupdatet.`,
        id
    })
}

exports.deletePost = (req, res) => {

    const { id } = req.params;

    res.status(200).json({
        message: `Der Record mit der "${id}" wurde gelöscht.`
        id
    })
}