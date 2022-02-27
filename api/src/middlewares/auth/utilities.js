const { ShopingSession } = require("../../db");

const createSession = async (info = undefined) => {
    let body = {
        ...info,
    }
    try {
        const session = await ShopingSession.create()
        let token = jwt.sign(body, AUTH_SECRET, { expiresIn: "10s" })
        return { token, id: session.id };
    } catch (error) {
        return error;
    }
}

const destroySession = async (id) => {
    try {
        await ShopingSession.destroy({
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