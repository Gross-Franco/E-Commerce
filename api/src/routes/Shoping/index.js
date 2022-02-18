const { Router } = require("express");
const { Cart, TotalPrice, deleteProductFromCart }  = require('./controller');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const shopingRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
shopingRouter.get('/cart', Cart);
shopingRouter.get('/totalPrice', TotalPrice);
shopingRouter.get('/deleteProductFromCart', deleteProductFromCart);

module.exports = shopingRouter;
