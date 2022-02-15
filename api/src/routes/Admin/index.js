const { Router } = require("express");
const { getProducts, createProduct, editProduct } = require("./controller");
// Importar todos los routers;

const adminRouter = Router();

// Configurar los routers

adminRouter.get('/products', getProducts);
adminRouter.get('/createProducts', createProduct);
adminRouter.get('/editProducts', editProduct);

module.exports = adminRouter;
