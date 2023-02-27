const jwt = require('jsonwebtoken')
require('dotenv').config({ path: './config.env' })

const verify = (req, res, next) => {

    const token = req.headers['x-access-token']

    console.log(token)

    if (!token) return res.status(401).json("You are not logged in");

    jwt.verify(token, process.env.SECRET_KEY, (err, userData) => {
        if (err) {
            console.log('not verified')
            return res.status(403).json("Token is not valid!");
        }
        console.log('verified')
        next();
    })
};

module.exports = { verify }