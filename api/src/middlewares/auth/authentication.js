const jwt = require('jsonwebtoken')
require('dotenv').config()
const { ShopingSession } = require("../../db");
let { FIRM } = process.env



const authenticate = async (req, res, next) => {
    // console.log(res)
    let Token = req.headers['authorization']?.split(' ')[1]

    if (Token) {
        jwt.verify(Token, FIRM, (err, decode) => {
            if (decode) {

            } else {
                res.status(403).json(err)
            }
        })
    } else {
        Token = await createToken();
    }
}

const createToken = async (info = undefined) => {
    const session = ShopingSession.create()
    let body = {
        session_id: session.id,
        ...info,
    }
    let token = jwt.sign(body, AUTH_SECRET, { expiresIn: AUTH_EXPIRES })
    return token;
}

module.exports = {
    authenticate
}