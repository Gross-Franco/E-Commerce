const { Router } = require("express");
const { getOrders, getOrderId, getOrderStatus } = require('./controller')
const { getProducts, createProduct, editProduct, getCategory, createCategory } = require("./controller");
// Importar todos los routers;

const adminRouter = Router();

// Configurar los routers


adminRouter.get('/admin/orders', getOrders)
adminRouter.get('/admin/orders/:id', getOrderId)
adminRouter.get('/admin/orders/status', getOrderStatus)

adminRouter.get('/products', getProducts);
adminRouter.post('/createProducts', createProduct);
adminRouter.post('/editProducts', editProduct);
adminRouter.get('/categories', getCategory)
adminRouter.post('/createCategory', createCategory)


module.exports = adminRouter;
