const { Router } = require("express");
const { createUser, getUsers, addAdress, addPayment } = require("./controller");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {postReviewProduct} =require('./controller')
const userRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
userRouter.post('/post/product/:idProduct',postReviewProduct)


userRouter.post('/createUser', createUser);
userRouter.get('/getUsers', getUsers)
userRouter.post('/addAddress', addAdress)
userRouter.post('/addPayment', addPayment)

module.exports = userRouter;
