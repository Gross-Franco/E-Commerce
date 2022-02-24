const { Router } = require("express");
const { shoppingSessionInit, deleteCart, addCartItem, getCartItems, shoppingTotalEdit, deleteShoppingSession, editItemQuantity, deleteCartItem, createOrder }  = require('./controller');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
//shopping session
router.post("/session", shoppingSessionInit);
router.put("/session", shoppingTotalEdit);
router.delete("/session", deleteShoppingSession);
//cart items
router.get("/cart", getCartItems);
router.post("/cart", addCartItem);
router.put("/cart", editItemQuantity);
router.delete('/cart', deleteCart)
router.delete("/item", deleteCartItem);
//purchase order
router.post("/order", createOrder);

module.exports = router;
