const { Router } = require("express");
const { authent } = require("../../middlewares/auth/auth");
const { authenticate } = require("../../middlewares/auth/authentication");

const { getUsers, addAdress, createUser, confirm, postReviewProduct, postLogin, addPayment, OrdersUser, forgotPassword, passwordResetToken, validate, getUserDetails } = require("./controller");


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const userRouter = Router();

// Configurar los routers
// Son llamadas ejemplo: baseUrl + '/user' + these routes
userRouter.post('/post/product/:idProduct', postReviewProduct)
userRouter.get('/getUsers', getUsers)
userRouter.post('/addAddress', addAdress)
// userRouter.post('/login', postLogin)
userRouter.post('/createUser', createUser);
userRouter.get('/confirm/:token', confirm);
userRouter.post('/addPayment', addPayment)
userRouter.get('/ordersuser', OrdersUser)
userRouter.post('/resetpassword', forgotPassword);
userRouter.post('/:token', passwordResetToken);
userRouter.get('/validate', validate);
userRouter.get("/details", authenticate, getUserDetails);

module.exports = userRouter;
