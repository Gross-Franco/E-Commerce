const { Router } = require("express");
const { signout } = require("../Auth/controller");
const { addAdress, confirm, postReviewProduct, addPayment, OrdersUser, forgotPassword, passwordResetToken } = require("./controller");


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const userRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
userRouter.post('/post/product/:idProduct', postReviewProduct);
userRouter.post('/addAddress', addAdress);
userRouter.post('/logout', signout);
// userRouter.get('/confirm/:token', confirm);
userRouter.post('/addPayment', addPayment);
userRouter.get('/ordersuser', OrdersUser);
userRouter.post('/post/product/:idProduct',postReviewProduct)
userRouter.post('/addAddress', addAdress)
userRouter.post('/resetpassword', forgotPassword);
userRouter.post('/:token', passwordResetToken);

module.exports = userRouter;
