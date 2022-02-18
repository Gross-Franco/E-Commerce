const { Router } = require("express");
const {getUsers, addAdress } = require("./controller");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {postReviewProduct} =require('./controller')
const userRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
userRouter.post('/post/product/:idProduct',postReviewProduct)

userRouter.get('/getUsers', getUsers)
userRouter.post('/addAddress', addAdress)

module.exports = userRouter;
