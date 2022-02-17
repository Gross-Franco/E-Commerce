const { Router } = require("express");
// Importar todos los routers;
const userRouter = require("./User/index.js");
const adminRouter = require("./Admin/index.js");
const productRouter = require("./Product/index.js");
const shopingRouter = require("./Shoping/index.js");
const Login = require("./Login/index.js");
const router = Router();

// Configurar los routers
router.use('/auth',Login)
router.use("/user", userRouter);
router.use("/admin", adminRouter);
router.use("/product", productRouter);
router.use("/shoping", shopingRouter);

module.exports = router;
