const { createSession } = require("../utilities");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { FIRM, TOKEN_COOKIE } = process.env;

const authenticate = (req, res, next) => {
    let { [TOKEN_COOKIE]: Token } = req.cookies;
    console.log(Token);

    if (Token) {
        jwt.verify(Token, FIRM, (err, decode) => {
            if (decode) {
                req.permits = decode
                next();
            } else {
                console.error(err);
                return res.status(401).json({ message: "Invalid Token recieved" })
            }
        })
    } else {
        next();
    }
}

module.exports = {
    authenticate
}