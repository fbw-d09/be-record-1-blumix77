require('dotenv').config();
const user = require("../models/User.js");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const secret = process.env.TOKEN_SECRET;
console.log("Secret log", secret)

exports.authorize = (req, res, next) => {
        const token = req.cookies.access_token;
        console.log(token);
try {
        const data = jwt.verify(token, secret);
        console.log("data", data);
        req.loggedInId = data.id;
        next();
} catch(err) {
        return res.sendStatus(400);
}
};

