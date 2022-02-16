const { Router } = require("express");
const { createUser, getUsers, addAdress } = require("./controller");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const userRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

userRouter.post('/createUser', createUser);
userRouter.get('/getUsers', getUsers)
userRouter.post('/addAddress', addAdress)

module.exports = userRouter;
