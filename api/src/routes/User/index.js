const { Router } = require("express");
const {getUsers, addAdress, createUser, postReviewProduct, postLogin, addPayment, OrdersUser } = require("./controller");


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const userRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
userRouter.post('/post/product/:idProduct',postReviewProduct)
userRouter.get('/getUsers', getUsers)
userRouter.post('/addAddress', addAdress)
userRouter.post('/register', createUser)
userRouter.post('/login', postLogin)
userRouter.post('/createUser', createUser);
userRouter.post('/addPayment', addPayment)
userRouter.get('/ordersuser', OrdersUser)

module.exports = userRouter;
