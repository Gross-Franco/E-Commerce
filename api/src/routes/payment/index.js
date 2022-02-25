const { Router } = require("express");
const { createOrder } = require("../Shoping/controller");


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const checkoutRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

checkoutRouter.get('/create-order', createOrder)





module.exports = checkoutRouter;

