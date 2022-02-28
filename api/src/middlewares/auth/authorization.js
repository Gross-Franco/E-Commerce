require("dotenv").config();

const authorize = (req, res, next) => {
    const authHeader = req.headers["permits"];
    let required = authHeader && authHeader.split(" ")[1];
    if (Number(required) === 3 && req.permits.isAdmin) next();
    else if (Number(required) === 2 && req.permits.user_id) next();
    else if (Number(required) === 1) next();
    else return res.sendStatus(403);
}

module.exports = {
    authorize,
}