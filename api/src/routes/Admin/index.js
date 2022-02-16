const { Router } = require("express");
const { getProducts, createProduct, editProduct, getCategory, createCategory } = require("./controller");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const adminRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

adminRouter.get('/products', getProducts);
adminRouter.post('/createProducts', createProduct);
adminRouter.post('/editProducts', editProduct);
adminRouter.get('/categories', getCategory)
adminRouter.post('/createCategory', createCategory)


module.exports = adminRouter;
