const { Router } = require("express");
const { signup, signin, signout } = require("./controller");

// const { signup, signin, authenticateToken } = require("./controller");


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.post('/signup', signup);
router.post("/signin", signin);
// router.post("/signout", signout);

module.exports = router;