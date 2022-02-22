const { Router } = require("express");

const { getOrders, getOrderId, allStatus, filterOrderByStatus, changeOrderStatus } = require('./controllerOrders')
const { getAllProducts, createProduct, editProduct, searchProductName } = require('./controllerProducts')
const { getCategory, createCategory, searchCategoryName } = require("./controllerCategories");
const { createAdmin, deleteUser } = require('./controller')

// Importar todos los routers;

const adminRouter = Router();

// Order routes
adminRouter.get('/orders', getOrders)
adminRouter.get('/orders/:id', getOrderId)
adminRouter.get('/status', allStatus)
adminRouter.get('/filterOrderByStatus', filterOrderByStatus)
adminRouter.get('/changeOrderStatus', changeOrderStatus)

// Product routes
adminRouter.get('/products', getAllProducts);
adminRouter.post('/createProducts', createProduct);
adminRouter.post('/editProducts', editProduct);
adminRouter.get('/productname', searchProductName)
// adminRouter.post('/addInventory', addToInvetory);
// adminRouter.post('/removeInventory', removeFromInvetory)

// Category routes
adminRouter.get('/categories', getCategory)
adminRouter.get('/categoryname', searchCategoryName)
adminRouter.post('/createCategory', createCategory)

// Admin routes
adminRouter.post('/createAdmin', createAdmin);
adminRouter.post('/deleteUser', deleteUser)

module.exports = adminRouter;
