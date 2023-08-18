
const express = require('express');

const router = express.Router();

const recordsController = require('./../controller/records.js');

/* router.use((req, res, next) => {
    console.log(req.method + " - " + req.url);

    next();
}) */

/* router.get("/:id", (req, res) => {
    
    const { id } = req.params;

    res.status(200).send("records id: " + id);
}) */

/* router.put("api/records/:id", (req, res) => {
    
    const { id } = req.params;

    res.status(200).send("records id: " + id);
})


router.delete("api/records/:id", (req, res) => {
    
    const { id } = req.params;

    res.status(200).send("records id: " + id);
}) */

router.route("/:id")

.get(recordsController.getPost)
.put(recordsController.updatePost)
.delete(recordsController.deletePost);

module.exports = router;