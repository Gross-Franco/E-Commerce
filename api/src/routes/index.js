const { Router } = require("express");
// Importar todos los routers;
const userRouter = require("./User/index.js");
const adminRouter = require("./Admin/index.js");
const productRouter = require("./Product/index.js");
const shoppingRouter = require("./Shoping/index.js");
const checkoutRouter = require("./payment/index.js");
const authRouter = require("./Auth/index.js");

const router = Router();

// Configurar los routers
router.use("/user", userRouter);
router.use("/admin", adminRouter);
router.use("/product", productRouter);
router.use("/shopping", shoppingRouter);
router.use("/checkout", checkoutRouter);
router.use("/api", authRouter);

module.exports = router;
