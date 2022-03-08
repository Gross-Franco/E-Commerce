const { use } = require("chai");
const { Router } = require("express");
const {authent} = require('../../middlewares/auth/auth')
const { authenticate } = require("../../middlewares/auth/authentication");

const {getUsers, addAdress, createUser,confirm,  postReviewProduct, FindReviwersByIdUser, postLogin, addPayment, forgotPassword, passwordResetToken, validate, getUserDetails, orderHistory, userReviews } = require("./controller");


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const userRouter = Router();

// Configurar los routers
// Son llamadas ejemplo: baseUrl + '/user' + these routes
userRouter.post('/post/postReview',postReviewProduct)
// userRouter.get('/get/Reviwer/:idUser',FindReviwersByIdUser)
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
userRouter.post('/:token', passwordResetToken)
userRouter.get('/validate', validate)

module.exports = userRouter;
