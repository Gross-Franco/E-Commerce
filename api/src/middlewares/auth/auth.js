const { User } = require('./../../db')
const jwt = require('jsonwebtoken')
require('dotenv').config()
let { FIRM } = process.env


module.exports = {
    authent: (req, res, next) => {
        console.log(req.headers)
        let Token = req.headers['authorization']?.split(' ')[1]
        if (Token) {
            jwt.verify(Token, FIRM, (err, decode) => {
                if (decode) {
                    User.findOne({ where: { email: decode.email } })
                        .then(r => {
                            let {
                                username,
                                email,
                                first_name,
                                last_name,
                                isAdmin
                            } = r
                            res.status(200).json({ success: true, data: { user: { username, email, first_name, last_name, isAdmin } } })
                        }, err => {
                            res.status(404).json({ success: false, error: "User not found" })
                        })
                } else {
                    res.status(400).json({ success: false, error: "Token expired" })
                }
            })
        } else {
            next()
        }
    }
}