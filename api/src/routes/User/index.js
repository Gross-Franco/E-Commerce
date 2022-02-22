const { Router } = require("express");

const {getUsers, addAdress, createUser, postReviewProduct, postLogin, addPayment, forgotPassword, passwordResetToken, OrdersUser } = require("./controller");


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const userRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//?----- Users ------//
userRouter.get('/', getUsers);
userRouter.post('/signup', createUser);
userRouter.post('/adress', addAdress);
//?----- Authentication ----//
userRouter.post('/login', postLogin);
userRouter.post('/resetpassword', forgotPassword);
userRouter.post('/token', passwordResetToken);
//?----- Posts -----//
userRouter.post('/post/product/:idProduct',postReviewProduct);
//?----- Purchase Order -------//
userRouter.post('/addPayment', addPayment);
userRouter.get('/ordersuser', OrdersUser);

module.exports = userRouter;
