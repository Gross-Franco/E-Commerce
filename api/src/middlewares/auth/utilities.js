require("dotenv").config();
const { ShoppingSession } = require("../../db");
const jwt = require("jsonwebtoken");
const { FIRM } = process.env;

const createSession = async (info = undefined) => {
    let body = {
        ...info,
    }
    try {
        if (!body.session_id) {
            const session = await ShoppingSession.create();
            body = {
                ...body,
                session_id: session.id,
            }
        }
        let token = jwt.sign(body, FIRM, { expiresIn: "10s" })
        console.log(jwt.decode(token));
        return { token };
    } catch (error) {
        console.log(error);
    }
}

const destroySession = async (id) => {
    try {
        await ShoppingSession.destroy({
            where: {
                id
            },
            truncate: true,
            cascade: true
        })
    } catch (error) {
        return error;
    }
}

module.exports = {
    createSession,
    destroySession
}