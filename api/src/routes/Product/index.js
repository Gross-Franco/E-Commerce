const { Router } = require("express");
const { getProducts, searchProductName } = require('./controller');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const productRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
productRouter.get('/product/:id', getProducts)
productRouter.get('/product/:name', searchProductName)



module.exports = productRouter;
