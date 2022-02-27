require("dotenv").config();
const { FIRM, TOKEN_COOKIE, SESSION_COOKIE } = process.env

const authorize = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    let required = authHeader && authHeader.split(" ")[1];
    if (Number(required) === 3 && req.permits.isAdmin) next();
    else if (Number(required) === 2 && req.permits.isUser) next();
    else if (Number(required) === 1) next();
    else return res.sendStatus(401);
}

module.exports = {
    authorize,
}