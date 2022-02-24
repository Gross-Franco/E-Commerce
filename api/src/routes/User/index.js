const { Router } = require("express");
const { authenticateToken } = require("../Auth/controller");

const { getUsers, addAdress, postReviewProduct, addPayment, forgotPassword, passwordResetToken, OrdersUser, createUser } = require("./controller");


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const userRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//?----- Users ------//
userRouter.get('/', getUsers);
userRouter.post('/signup', authenticateToken, createUser);
userRouter.post('/adress', addAdress);
//?----- Password ----//
// userRouter.post('/login', postLogin);
userRouter.post('/resetpassword', forgotPassword);
userRouter.post('/token', passwordResetToken);
//?----- Posts -----//
userRouter.post('/post/product/:idProduct',postReviewProduct);
//?----- Purchase Order -------//
userRouter.post('/addPayment', addPayment);
userRouter.get('/ordersuser', OrdersUser);

module.exports = userRouter;
