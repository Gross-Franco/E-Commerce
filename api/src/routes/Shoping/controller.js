const { Product, OrderDetails, OrderItems, PaymentDetails, User, ShoppingSession, CartItems } = require('../../db.js');

const addCartItem = async (req, res, next) => {
		const { sessionId, productId, quantity } = req.body;
		try {
			const isSession = await ShoppingSession.findByPk(sessionId);
			const isProduct = await Product.findByPk(productId);
			if (isSession && isProduct) {
				CartItems.create({
					quantity,
				});
				await CartItems.setCart(sessionId);
				await CartItems.setProduct(productId);
				let newCartItem = CartItems.findOne({
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
	};

const editItemQuantity = async (req, res, next) => {
		const { quantity, productId, sessionId } = req.body;
		try {
			await CartItems.update(
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
	};

const shoppingSessionInit = async (req, res, next) => {
		const { user_id } = req.query;
		try {
			await ShoppingSession.create({});
			await ShoppingSession.setUser(user_id);
			return res.sendStatus(201);
		} catch (error) {
			next(error);
		}
	};

const shoppingTotalEdit = async (req, res, next) => {
		const { user_id, product_id } = req.query;
		try {
			const session = await ShoppingSession.findOne({
				atributes: ["total", "id"],
				where: {
					user_id,
				},
			});

			let totalPrice = session.total;

			const productPrice = await Product.findByPk(product_id, {
				atributes: ["price"],
			});

			const quantity = await CartItems.findOne({
				atributes: ["quantity"],
				where: {
					[Op.and]: [{ session_id: session.id }, { product_id }],
				},
			});

			totalPrice += productPrice.price * quantity.quantity;

			await ShoppingSession.update(
				{ total: totalPrice },
				{
					where: {
						[Op.and]: [{ user_id }, { product_id }],
					},
				}
			);
			return res.sendStatus(200);
		} catch (error) {
			next(error);
		}
	};

const createOrder = async (req, res, next) => {
	const { session_id, provider } = req.body;
	try{
		const cart = await ShoppingSession.findByPk(session_id, {
			atributes: ["total"],
			include: {
				model: CartItems,
				atributes: ["quantity", "product_id"],
			}
		});

		const orderCreated = await OrderDetails.create({
			total: cart.total,
			status: "created",
		});

		const purchaseItems = await OrderItems.bulkCreate(cart.cartItems.map(items => items.quantity));

		const payment = await PaymentDetails.create({
			amount: Math.round(cart.total),
			provider,
			status: "in-progress",
		});

		await orderCreated.setItems(purchaseItems.map(item => item.id));
		await PaymentDetails.setOrderPayment(payment.id)
		for(let item of purchaseItems){
			await Product.setToOrder(item.id);
		}
		await User.setPurchaseOrder(orderCreated.id)
		return res.status(201).json(orderCreated)
	}catch(error){
		next(error);
	}
};

const processPayment = () => {};

const deleteShoppingSession =  async (req, res, next) => {
	const { session_id } = req.query;
	let destroyed = {};
	try{
		destroyed.cart = await ShoppingSession.destroy({
			where: {
				id: session_id,
			}
		});
		destroyed.items = await CartItems.destroy({
			where:{
				session_id,
			}
		})
		return res.status(200).json(destroyed);
	}catch(error){
		next(error);
	}
};

const deleteCartItem = async (req,res,next) => {
	const { session_id, product_id } = req.query;
	try{
		
		let destroyed = await CartItems.destroy({
			where:{
				[Op.and]: [{session_id},{product_id}],
			}
		})

		destroyed ? res.status(200).json(destroyed) : next({status: 404, message:"Not Found"});

	}catch(error){
		next(error);
	}
};

module.exports = {
	// Cart, 
	// TotalPrice,
	// deleteProductFromCart,
	addCartItem,
	shoppingSessionInit,
	shoppingTotalEdit,
	editItemQuantity,
	createOrder,
	deleteShoppingSession,
	deleteCartItem,
}
