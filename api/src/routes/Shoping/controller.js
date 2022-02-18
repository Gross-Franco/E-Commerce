// const axios = require("axios");
const { Op } = require("sequelize");
const { shoppingSession, cartItems, Product, User } = require("../../db.js");
// const Promise = require("bluebird");

module.exports = {
	addCartItem: async (req, res, next) => {
		const { sessionId, productId, quantity } = req.body;
		try {
			const isSession = await shoppingSession.findByPk(sessionId);
			const isProduct = await Product.findByPk(productId);
			if (isSession && isProduct) {
				cartItems.create({
					quantity,
				});
				await cartItems.setshoppingSession(sessionId);
				await cartItems.setProduct(productId);
				let newCartItem = cartItems.findOne({
					where: {
						product_id: productId,
						session_id: sessionId,
					},
				});
				return res.status(200).json(newCartItem);
			} else {
				next({ status: 404, message: "Not Found" });
			}
		} catch (error) {
			next(error);
		}
	},

	editItemQuantity: async (req, res, next) => {
		const { quantity, productId, sessionId } = req.body;
		try {
			await cartItems.update(
				{ quantity },
				{
					where: {
						product_id: productId,
						session_id: sessionId,
					},
				}
			);
			return res.sendStatus(200);
		} catch (error) {
			next(error);
		}
	},

	shoppingSessionInit: async (req, res, next) => {
		const { userId } = req.query;
		try {
			await shoppingSession.create();
			await shoppingSession.setUser(userId);
			return res.sendStatus(201);
		} catch (error) {
			next(error);
		}
	},

	shoppingTotalEdit: async (req, res, next) => {
		const { user_id, product_id } = req.query;
		try {
			const session = await shoppingSession.findOne({
				atributes: ["total", "id"],
				where: {
					user_id,
				},
			});
			let totalPrice = session.total;
			const productPrice = await Product.findByPk(product_id, {
				atributes: ["price"],
			});
			const quantity = await cartItems.findOne({
				atributes: ["quantity"],
				where: {
					[Op.and]: [{ session_id: session.id }, { product_id }],
				},
			});
			totalPrice += productPrice.price * quantity.quantity;

			await shoppingSession.update(
				{ total: totalPrice },
				{
					where: {
						[Op.and]: [{ user_id }, { product_id }],
					},
				}
			);
		} catch (error) {
			next(error);
		}
	},

	processOrder: () => {},

	processPayment: () => {},

	deleteShoppingSession: () => {},

	deleteShoppingCart: () => {},
};
