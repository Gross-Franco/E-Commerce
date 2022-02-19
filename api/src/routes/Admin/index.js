const { Router } = require("express");

const { getOrders, getOrderId, getOrderStatus, addCategoryToProduct, removeCategoryFromProduct, createAdmin, addToInvetory, removeFromInvetory } = require('./controller')
const { getAllProducts, createProduct, editProduct, getCategory, createCategory, allStatus } = require("./controller");

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

adminRouter.post('/addCategory', addCategoryToProduct)
adminRouter.post('/removeCategory', removeCategoryFromProduct)

adminRouter.post('/createAdmin', createAdmin);

adminRouter.post('/addInventory', addToInvetory);
adminRouter.post('/removeInventory', removeFromInvetory)

adminRouter.get('/status', allStatus)



module.exports = adminRouter;
