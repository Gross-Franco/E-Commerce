const setCookie = (req, res, next) => {
    res.cookie("Hola", "Mundo", { maxAge: 5000 })
    console.log(req.cookies);
    next();
}

module.exports = {
    setCookie,
}