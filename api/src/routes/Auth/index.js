const { Router } = require("express");
const { signup, signin } = require("./controller");

// const { signup, signin, authenticateToken } = require("./controller");


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.post('/signup', signup);
router.post("/signin", signin);
// router.get("/auth", authenticateToken);


module.exports = router;