const { Router } = require("express");

const { getOrders, getOrderId, getOrderStatus, addCategoryToProduct, removeCategoryFromProduct, createAdmin, addToInvetory, removeFromInvetory } = require('./controller')
const { getAllProducts, createProduct, editProduct, getCategory, createCategory, allStatus, searchProductName, searchCategoryName, filterOrderByStatus, changeOrderStatus } = require("./controller");

// Importar todos los routers;

const adminRouter = Router();

// Configurar los routers

adminRouter.get('/orders', getOrders)
adminRouter.get('/orders/:id', getOrderId)
adminRouter.get('/orders/status', getOrderStatus)
adminRouter.get('/filterOrderByStatus', filterOrderByStatus)
adminRouter.get('/changeOrderStatus', changeOrderStatus)

adminRouter.get('/products', getAllProducts);
adminRouter.post('/createProducts', createProduct);
adminRouter.post('/editProducts', editProduct);
adminRouter.get('/categories', getCategory)
adminRouter.get('/categoryname', searchCategoryName)
adminRouter.post('/createCategory', createCategory)
adminRouter.get('/productname', searchProductName)

adminRouter.post('/addCategory', addCategoryToProduct)
adminRouter.post('/removeCategory', removeCategoryFromProduct)

adminRouter.post('/createAdmin', createAdmin);

adminRouter.post('/addInventory', addToInvetory);
adminRouter.post('/removeInventory', removeFromInvetory)

adminRouter.get('/status', allStatus)



module.exports = adminRouter;
