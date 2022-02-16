const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {postReviewProduct} =require('./controller')
const userRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
userRouter.post('/user/post/product/:idProduct',postReviewProduct)

module.exports = userRouter;
