
const express = require('express');

const router = express.Router();


router.use((req, res, next) => {
    console.log(req.method + " - " + req.url);

    next();
})

router.get("api/records/:id", (req, res) => {
    
    const { id } = req.params;

    res.status(200).send("records id: " + id);
})

router.put("api/records/:id", (req, res) => {
    
    const { id } = req.params;

    res.status(200).send("records id: " + id);
})


router.delete("api/records/:id", (req, res) => {
    
    const { id } = req.params;

    res.status(200).send("records id: " + id);
})



module.exports = router;