const { Router } = require("express");

const { getUsers, addAdress, postReviewProduct, addPayment, forgotPassword, passwordResetToken, OrdersUser } = require("./controller");


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const userRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
<<<<<<< HEAD
//?----- Users ------//
userRouter.get('/', getUsers);
// userRouter.post('/signup', createUser);
userRouter.post('/adress', addAdress);
//?----- Password ----//
// userRouter.post('/login', postLogin);
=======
userRouter.post('/post/product/:idProduct',postReviewProduct)
userRouter.get('/getUsers', getUsers)
userRouter.post('/addAddress', addAdress)
userRouter.post('/login', postLogin)
// userRouter.post('/createUser', createUser);
userRouter.post('/addPayment', addPayment)
userRouter.get('/ordersuser', OrdersUser)
>>>>>>> 74508aa97f693482f5f41d81991f84ec5e6d8a8e
userRouter.post('/resetpassword', forgotPassword);
userRouter.post('/token', passwordResetToken);
//?----- Posts -----//
userRouter.post('/post/product/:idProduct',postReviewProduct);
//?----- Purchase Order -------//
userRouter.post('/addPayment', addPayment);
userRouter.get('/ordersuser', OrdersUser);

module.exports = userRouter;
