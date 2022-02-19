const { Router } = require("express");
// Importar todos los routers;
const userRouter = require("./User/index.js");
const adminRouter = require("./Admin/index.js");
const productRouter = require("./Product/index.js");
const shoppingRouter = require("./Shoping/index.js");

const router = Router();

// Configurar los routers
router.use("/user", userRouter);
router.use("/admin", adminRouter);
router.use("/product", productRouter);
router.use("/shopping", shoppingRouter);

module.exports = router;
