const { Router } = require("express");

// const { createOrder } = require("./controller");
const { payment, payments1item } = require("./controller");



// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const checkoutRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// checkoutRouter.post('/create-order', createOrder)
checkoutRouter.post('/payments', payment)
checkoutRouter.post('/detail/payments1item', payments1item)






module.exports = checkoutRouter;

