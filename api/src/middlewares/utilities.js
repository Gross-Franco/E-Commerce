const setCookie = (req, res, next) => {
    res.cookie("Hola", "Mundo");
    console.log(req.cookies);
    next();
}

module.exports = {
    setCookie,
}