const { use } = require("chai");
const { Router } = require("express");
const {authent} = require('../../middlewares/auth/auth')
const { authenticate } = require("../../middlewares/auth/authentication");


const {getUsers, addAdress, createUser,confirm,  postReviewProduct,FindReviwersByIdUser,  postLogin, addPayment, forgotPassword, passwordResetToken, validate, getUserDetails, orderHistory, userReviews, getUserAddresses, getUserPayments } = require("./controller");
const { removeFromWishlist, addToWishlist, getWishlist } = require("./controllerWishlist");



// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const userRouter = Router();

// Configurar los routers
// Son llamadas ejemplo: baseUrl + '/user' + these routes

userRouter.post('/post/postReview',postReviewProduct)

userRouter.get('/getUsers', getUsers)
userRouter.get('/history/:userid', orderHistory)
userRouter.get('/reviews/:userid', userReviews)
userRouter.post('/addAddress', addAdress)
// userRouter.post('/login', postLogin)
userRouter.post('/createUser', createUser);
userRouter.get('/confirm/:token', confirm);
userRouter.post('/addPayment', addPayment)
userRouter.post('/resetpassword', forgotPassword);
userRouter.get('/validate', validate);

userRouter.get('/wishlist/:userid', getWishlist)
userRouter.post('/removeFromWishlist', removeFromWishlist);
userRouter.post('/addToWishlist', addToWishlist);


// userRouter.get('/details', authenticate, getUserDetails)  // Real function
userRouter.get('/details/:userid', getUserDetails)      // For testing
userRouter.get('/address/:userid', getUserAddresses)
userRouter.get('/payments/:userid', getUserPayments)


//esta ruta debe ir al final 
userRouter.post('/:token', passwordResetToken);

module.exports = userRouter;
