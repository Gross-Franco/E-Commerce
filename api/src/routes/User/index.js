const { Router } = require("express");

const {getUsers, addAdress, createUser, postReviewProduct, postLogin, addPayment, OrdersUser, forgotPassword, passwordResetToken } = require("./controller");


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const userRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
userRouter.post('/post/product/:idProduct',postReviewProduct)
userRouter.get('/getUsers', getUsers)
userRouter.post('/addAddress', addAdress)
<<<<<<< HEAD
// userRouter.post('/register', createUser)
=======
>>>>>>> beaf91bc6bb220d9779f107e7cc4a9c624925842
userRouter.post('/login', postLogin)
userRouter.post('/createUser', createUser);
userRouter.post('/addPayment', addPayment)
userRouter.get('/ordersuser', OrdersUser)
userRouter.post('/resetpassword', forgotPassword);
userRouter.post('/:token', passwordResetToken)

module.exports = userRouter;
