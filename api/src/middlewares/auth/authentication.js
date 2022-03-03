const { createSession, setCookie } = require("../utilities");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { FIRM, TOKEN_COOKIE } = process.env;

const authenticate = (req, res, next) => {
    let { [TOKEN_COOKIE]: Token } = req.cookies;

    if (Token) {
        jwt.verify(Token, FIRM, (err, decode) => {
            if (decode) {
                req.permits = decode
                next();
            } else {
                setCookie(res, TOKEN_COOKIE, "", 0)
                return res.status(403).json({ message: "Invalid Token recieved" })
            }
        })
    } else {
        next();
    }
}

module.exports = {
    authenticate
}