const { Router } = require("express");
const { getProductId, searchProductName, getProducts, filterByCategory } = require('./controller');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const productRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

productRouter.get('/productId/:id', getProductId)
productRouter.get('/', getProducts)
productRouter.post('/filtercategory', filterByCategory)
productRouter.get('/name', searchProductName) // recibe nombre por query

// /product/name?name=busqueda
// /product/productId/1234123



module.exports = productRouter;
