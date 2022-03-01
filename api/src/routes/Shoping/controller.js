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
const { destroySession, createSession, setCookie } = require('../../middlewares/utilities.js');

const getCartItems = async (req, res) => {
	const { session_id } = req.permits;
	try {
		let items = await CartItems.findAll({ where: { session_id } });
		let cartitems = await Promise.all(
			items.map(async (item) => {
				let product = await Product.findOne({
					where: { id: item.product_id },
					attributes: {
						exclude: ["createdAt", "updatedAt", "description"],
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
						SKU: product.SKU,
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
	const { product_id, quantity } = req.body;
	const { session_id } = req.permits;

	try {
		const isSession = await ShoppingSession.findByPk(session_id);
		const isProduct = await Product.findByPk(product_id);
		if (isSession && isProduct && (typeof quantity === "number" && quantity)) {
			let [item, created] = await CartItems.findOrCreate({
				where: {
					[Op.and]: [{ session_id }, { product_id }]
				},
				defaults: {
					quantity,
					session_id,
					product_id
				},
			});
			if (created) {
				// await shoppingTotalEdit(session_id, product_id);
				return res.status(201).json(item);
			}
			else {
				await CartItems.update({ quantity: (item.quantity + quantity) }, {
					where: {
						id: item.id,
					}
				});
				// await shoppingTotalEdit(session_id, product_id);
				return res.sendStatus(200);
			}
		} else {
			next({ status: 404, message: "Not Found" });
		}
	} catch (error) {
		next(error);
	}
};

const editItemQuantity = async (req, res, next) => {
	const { quantity, product_id } = req.body;
	const { session_id } = req.permits;
	try {
		let [updated] = await CartItems.update(
			{ quantity },
			{
				where: {
					[Op.and]: [{ session_id }, { product_id }]
				},
			}
		);
		if (updated) {
			//await shoppingTotalEdit(session_id, product_id);
			return res.status(200).json(updated);
		}
		else next({ status: 404, message: "Not Found" })
	} catch (error) {
		next(error);
	}
};

const shoppingTotalEdit = async (session_id, product_id) => {
	try {
		const sessionToUpdate = await ShoppingSession.findByPk(session_id, {
			atributes: ["total", "user_id"],
		});

		let totalPrice = sessionToUpdate.total

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

		totalPrice += (parseFloat(productPrice.price) * parseInt(productQuantity.quantity));

		console.log(typeof totalPrice)

		sessionToUpdate.set({
			...sessionToUpdate,
			total: totalPrice,
		})

		await sessionToUpdate.save();

		// console.log(sessionToUpdate.total);
	} catch (error) {
		// console.log(error);
	}
};

const createOrder = async (req, res, next) => {
	const { provider } = req.body;
	const { session_id, user_id, isAdmin } = req.permits;
	try {
		const cart = await ShoppingSession.findByPk(session_id, {
			include: [{
				model: CartItems,
				as: "cartItems",
				atributes: ["quantity", "product_id"],
				include: {
					model: Product,
					as: ["product"]
				}
			}, User]
		});

		if (cart) {
			const orderCreated = await OrderDetails.create({
				total: cart.total,
				status: "Created",
				// user_id: cart.user.id
			});
			if (cart.user.id) orderCreated.setUser(cart.user.id);

			const orderItems = await OrderItems.bulkCreate(cart.cartItems.map(item => ({
				quantity: item.quantity,
				product_id: item.product_id,
			})));

			await orderCreated.setOrderItems(orderItems.map(item => item.id))

			for (let index of orderItems) {
				await orderCreated.cartItems[index].product.addCartItem(orderItems[index].id);
			}

			const payment = await PaymentDetails.create({
				amount: Math.round(cart.total),
				provider,
				status: "in-progress",
				order_id: orderCreated.id,
			});

			await payment.setOrderPayment(orderCreated.id)

			destroySession(session_id)
				.then(() => {
					return createSession({ user_id, isAdmin })
				})
				.then(({ token }) => {
					setCookie(res, token);
					return res.status(201).json(orderCreated);
				})
				.catch(error => res.status(500).json(error))
		} else {
			next({ status: 404, message: "Not Found" });
		}
	} catch (error) {
		next(error);
	}
};

const processPayment = () => { };

const destroyCartItems = async (session_id) => {
	const destroyeditems = await CartItems.destroy({
		where: {
			session_id,
		},
	});
	return destroyeditems;
};

const deleteCart = async (req, res) => {
	const { session_id } = req.permits;
	await ShoppingSession.update({ total: 0.0 }, { where: { id: session_id } });
	res.json(destroyCartItems(session_id));
};

const deleteCartItem = async (req, res, next) => {
	const { product_id } = req.query;
	const { session_id } = req.permits;
	try {
		let destroyed = await CartItems.destroy({
			where: {
				[Op.and]: [{ session_id }, { product_id }],
			},
		});
		return destroyed
			? res.status(200).json(destroyed)
			: res.status(404).json({ message: "Not Found" });
	} catch (error) {
		return res.status(500).json(error);
	}
};

module.exports = {
	getCartItems,
	deleteCart,
	addCartItem,
	shoppingTotalEdit,
	editItemQuantity,
	createOrder,
	deleteCartItem,
};