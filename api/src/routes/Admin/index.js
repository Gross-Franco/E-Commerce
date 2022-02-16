const { Router } = require("express");
const { getOrders, getOrderId, getOrderStatus } = require('./controller')
const { getAllProducts, createProduct, editProduct, getCategory, createCategory } = require("./controller");
// Importar todos los routers;

const adminRouter = Router();

// Configurar los routers

adminRouter.get('/orders', getOrders)
adminRouter.get('/orders/:id', getOrderId)
adminRouter.get('/orders/status', getOrderStatus)

adminRouter.get('/products', getAllProducts)
adminRouter.post('/createProducts', createProduct)
adminRouter.post('/editProducts', editProduct)
adminRouter.post('/createCategory', createCategory)


module.exports = adminRouter;
