const { Router } = require("express");
const { getOrders, getOrderId, getOrderStatus } = require('./controller')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const adminRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

adminRouter.get('/admin/orders', getOrders)
adminRouter.get('/admin/orders/:id', getOrderId)
adminRouter.get('/admin/orders/status', getOrderStatus)

module.exports = adminRouter;
