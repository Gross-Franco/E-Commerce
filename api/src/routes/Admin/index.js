const { Router } = require("express");
const { getOrders, getOrderId, getOrderStatus } = require('./controller')
const { getAllProducts, createProduct, editProduct, getCategory, createCategory, allStatus} = require("./controller");
// Importar todos los routers;

const adminRouter = Router();

// Configurar los routers

adminRouter.get('/orders', getOrders)
adminRouter.get('/orders/:id', getOrderId)
adminRouter.get('/orders/status', getOrderStatus)

adminRouter.get('/products', getAllProducts);
adminRouter.post('/createProducts', createProduct);
adminRouter.post('/editProducts', editProduct);
adminRouter.get('/categories', getCategory)
adminRouter.post('/createCategory', createCategory)
adminRouter.get('/status', allStatus)


module.exports = adminRouter;
