const {
  Product,
  OrderDetails,
  OrderItems,
  PaymentDetails,
  User,
  ShoppingSession,
  CartItems,
  ProductInventory,
} = require("../../db.js");
const { Op } = require("sequelize");

const getCartItems = async (req, res) => {
  const { session_id } = req.query;
  try {
    let items = await CartItems.findAll({ where: { session_id } });
    let cartitems = await Promise.all(
      items.map(async (item) => {
        let product = await Product.findOne({
          where: { id: item.product_id },
          attributes: {
            exclude: ["createdAt", "updatedAt", "description", "SKU"],
          },
        });
        let inventory = await ProductInventory.findOne({
          where: { id: product.inventory_id },
        });
        return {
          id: item.id,
          product: {
            id: product.id,
            name: product.name,
            image: product.image,
            price: product.price,
            inventory: inventory.quantity,
            discount_id: product.discount_id,
          },
          quantity: item.quantity,
        };
      })
    );
    res.json(cartitems);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

const addCartItem = async (req, res, next) => {
  const { session_id, product_id } = req.body;
  try {
    const isSession = await ShoppingSession.findByPk(session_id);
    const isProduct = await Product.findByPk(product_id);
	console.log(isSession);
    if (isSession && isProduct) {
      let [item, created] = await CartItems.findOrCreate({
        where: {
          [Op.and]: [{ session_id }, { product_id }],
        },
        defaults: {
          quantity: 1,
          session_id,
          product_id,
        },
      });
      return res.status(201).json(item);
      // if(created){
      // 	// await shoppingTotalEdit(session_id, product_id);
      // }
      // // else{
      // // 	await CartItems.update({quantity: (item.quantity + quantity)}, {
      // // 		where: {
      // // 			id: item.id,
      // // 		}
      // // 	});
      // // 	// await shoppingTotalEdit(session_id, product_id);
      // // 	return res.sendStatus(200);
      // // }
    } else {
      next({ status: 404, message: "Not Found" });
    }
  } catch (error) {
    next(error);
  }
};

const editItemQuantity = async (req, res, next) => {
  const { quantity, product_id, session_id } = req.body;
  try {
    let [updated] = await CartItems.update(
      { quantity },
      {
        where: {
          [Op.and]: [{ session_id }, { product_id }],
        },
      }
    );
    if (updated) {
      // await shoppingTotalEdit(session_id, product_id);
      return res.status(200).json(updated);
    } else next({ status: 404, message: "Not Found" });
  } catch (error) {
    next(error);
  }
};

const shoppingSessionInit = async (req, res, next) => {
  const { user_id } = req.query;

  try {
    if (user_id) {
      let [session, created] = await ShoppingSession.findOrCreate({
        where: {
          user_id,
        },
      });
      if (created) {
        let user = await User.findByPk(user_id);
        await user.setSession(user_id);
      }
      return res.status(201).json(session);
    } else {
      let session = await ShoppingSession.create({});
      res.status(200).json(session);
    }
  } catch (error) {
    next(error);
  }
};

const shoppingTotalEdit = async (session_id, product_id) => {
  try {
    const sessionToUpdate = await ShoppingSession.findByPk(session_id, {
      atributes: ["total", "user_id"],
    });

    let totalPrice = sessionToUpdate.total;

    const productPrice = await Product.findByPk(product_id, {
      atributes: ["price"],
    });

    const productQuantity = await CartItems.findOne({
      atributes: ["quantity"],
      where: {
        [Op.and]: [{ session_id }, { product_id }],
      },
    });

    totalPrice = parseFloat(totalPrice);

    totalPrice +=
      parseFloat(productPrice.price) * parseInt(productQuantity.quantity);

    console.log(typeof totalPrice);

    sessionToUpdate.set({
      ...sessionToUpdate,
      total: totalPrice,
    });

    await sessionToUpdate.save();

    // console.log(sessionToUpdate.total);
  } catch (error) {
    // console.log(error);
  }
};

const createOrder = async (req, res, next) => {
  const { session_id, provider } = req.body;
  try {
    const cart = await ShoppingSession.findByPk(session_id, {
      include: [
        {
          model: CartItems,
          atributes: ["quantity", "product_id"],
        },
        User,
      ],
    });

    if (cart) {
      const orderCreated = await OrderDetails.create({
        total: cart.total,
        status: "Created",
        user_id: cart.user.id,
      });

      await OrderItems.bulkCreate(
        cart.cartItems.map((item) => ({
          quantity: item.quantity,
          product_id: item.product_id,
          order_id: orderCreated.id,
        }))
      );

      const payment = await PaymentDetails.create({
        amount: Math.round(cart.total),
        provider,
        status: "in-progress",
        order_id: orderCreated.id,
      });

      // await orderCreated.setItems(purchaseItems.map(item => item.id));
      await payment.setOrderPayment(orderCreated.id);
      // for(let item of purchaseItems){
      // 	await Product.addToOrder(item.id);
      // }
      // await User.setPurchaseOrder(orderCreated.id)
      return res.status(201).json(orderCreated);
    } else {
      next({ status: 404, message: "Not Found" });
    }
  } catch (error) {
    next(error);
  }
};

const processPayment = () => {};

const destroyCartItems = async (session_id) => {
  const destroyeditems = await CartItems.destroy({
    where: {
      session_id,
    },
  });
  return destroyeditems;
};
const deleteCart = async (req, res) => {
  const { session_id } = req.query;
  await ShoppingSession.update({ total: 0.0 }, { where: { id: session_id } });
  res.json(destroyCartItems(session_id));
};

const deleteShoppingSession = async (req, res, next) => {
  const { session_id } = req.query;
  let destroyed = {};
  try {
    destroyed.items = await destroyCartItems(session_id);
    destroyed.cart = await ShoppingSession.destroy({
      where: {
        id: session_id,
      },
    });
    return res.status(200).json(destroyed);
  } catch (error) {
    next(error);
  }
};

const deleteCartItem = async (req, res, next) => {
  const { session_id, product_id } = req.query;
  try {
    let destroyed = await CartItems.destroy({
      where: {
        [Op.and]: [{ session_id }, { product_id }],
      },
    });
    destroyed
      ? res.status(200).json(destroyed)
      : next({ status: 404, message: "Not Found" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCartItems,
  deleteCart,
  addCartItem,
  shoppingSessionInit,
  shoppingTotalEdit,
  editItemQuantity,
  createOrder,
  deleteShoppingSession,
  deleteCartItem,
};
