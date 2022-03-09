const { createSession, setCookie } = require("../utilities");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { FIRM, TOKEN_COOKIE, DOMAIN } = process.env;

const authenticate = (req, res, next) => {
    let token = req.headers.authorization.split(" ")[1];
    if (token !== "null") {
        jwt.verify(token, FIRM, (err, decode) => {
            if (decode) {
                req.permits = decode
                next();
            } else {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized"
                });
            }
        })
    } else {
         return res.status(403).json({
            isAdmin: false,
            success: false,
            message: "No token provided"
         })
    }
}

module.exports = {
    authenticate
}