const { Router } = require("express");

// const { createOrder } = require("./controller");
const { payment } = require("./controller");



// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const checkoutRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// checkoutRouter.post('/create-order', createOrder)
checkoutRouter.post('/payments', payment)






module.exports = checkoutRouter;

