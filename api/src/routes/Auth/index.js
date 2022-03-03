const { Router } = require("express");
const { authenticate } = require("../../middlewares/auth/authentication");
const { createAdmin } = require("../Admin/controller");
const { signup, signin, signout, checkSession } = require("./controller");

// const { signup, signin, authenticateToken } = require("./controller");


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.post('/signup', signup);
// router.post("/signin", signin);
// router.delete("/signout", signout);
// router.post("/signout", signout);
// router.get('/createAdmin/:id', createAdmin);
router.post("/session", authenticate, checkSession);

module.exports = router;