const { Router } = require("express");
const { signup } = require("../Auth/controller");
const { addCartItem, getCartItems, shoppingTotalEdit, editItemQuantity, deleteCartItem, createOrder, deleteCart } = require('./controller');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
//shopping session
//router.put("/session", shoppingTotalEdit);
//cart items
router.get("/cart", getCartItems);
router.post("/cart", addCartItem);
router.put("/cart", editItemQuantity);
router.delete('/cart', deleteCart)
router.delete("/item", deleteCartItem);
//purchase order
router.post("/order", createOrder);

module.exports = router;
