const { use } = require("chai");
const { Router } = require("express");
const {authent} = require('../../middlewares/auth/auth')
const { authenticate } = require("../../middlewares/auth/authentication");

const {getUsers, addAdress, createUser,confirm,  postReviewProduct, postLogin, addPayment, forgotPassword, passwordResetToken, validate, getUserDetails, orderHistory, userReviews } = require("./controller");
const { removeFromWishlist, addToWishlist } = require("./controllerWishlist");



// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const userRouter = Router();

// Configurar los routers
// Son llamadas ejemplo: baseUrl + '/user' + these routes
userRouter.post('/post/product/:idProduct',postReviewProduct)
userRouter.get('/getUsers', getUsers)
userRouter.get('/details', authenticate, getUserDetails)
userRouter.get('/history/:userid', orderHistory)
userRouter.get('/reviews/:userid', userReviews)
userRouter.post('/addAddress', addAdress)
userRouter.post('/login',authent, postLogin)
userRouter.post('/createUser', createUser);
userRouter.get('/confirm/:token', confirm);
userRouter.post('/addPayment', addPayment)
userRouter.post('/resetpassword', forgotPassword);
userRouter.get('/validate', validate);

userRouter.post('/removeFromWishlist', removeFromWishlist);
userRouter.post('/addToWishlist', addToWishlist);


//esta ruta debe ir al final 
userRouter.post('/:token', passwordResetToken);

module.exports = userRouter;
