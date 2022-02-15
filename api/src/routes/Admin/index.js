const { Router } = require("express");
const { getProducts, createProduct, editProduct } = require("./controller");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const adminRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

adminRouter.get('/products', getProducts);
adminRouter.get('/createProducts', createProduct);
adminRouter.get('/editProducts', editProduct);

module.exports = adminRouter;
