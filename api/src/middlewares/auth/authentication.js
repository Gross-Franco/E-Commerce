const jwt = require('jsonwebtoken')
require('dotenv').config()
const { createSession, destroySession, setCookie } = require('../utilities');
const { FIRM, TOKEN_COOKIE } = process.env

const authenticate = async (req, res, next) => {
    const { [TOKEN_COOKIE]: Token } = req.cookies;
    // console.log(req.cookies)

    if (Token) {
        jwt.verify(Token, FIRM, (err, values) => {
            if (err) {
                if (err.expiredAt) {
                    const decoded = jwt.decode(Token);
                    destroySession(decoded.session_id)
                        .then(() => {
                            return createSession();
                        })
                        .then(({ token, permits }) => {
                            // res.cookie(TOKEN_COOKIE, token, { maxAge: 2592000000, sameSite: "None", httpOnly: true, secure: true })
                            setCookie(res, token);
                            req.permits = permits
                            next();
                        })
                        .catch(error => {
                            return res.status(500).json(error);
                        })
                } else {
                    // res.cookie(TOKEN_COOKIE, Token, { maxAge: 0, sameSite: "None", httpOnly: true, secure: true });
                    setCookie(res, Token);
                    return res.status(401).json(err);
                }
            } else {
                req.permits = values;
                next();
                return;
            }
        })
    } else {
        try {
            const { token, permits } = await createSession();
            req.permits = permits
            // res.cookie(TOKEN_COOKIE, token, { maxAge: 2592000000, sameSite: "None", httpOnly: true })
            setCookie(res, token);
            next();
            return;
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = {
    authenticate,
}