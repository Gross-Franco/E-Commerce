require("dotenv").config();
const axios = require("axios");
const { Discount, ProductCategory, ProductInventory, Product } = require("../../db.js");

const getOrderStatus = async (req, res) => {
	try {
		const status = await Order_Details.status.findAll();
		res.status(200).send(status);
	} catch (err) {
		console.log(err);
		res.status(404).send(err);
	}
};

const getInfoProducts = async () => {
	try {
		let search = await Product.findAll({
			include: {
				model: ProductCategory,
				attributes: ["name"],
				through: {
					attributes: [],
				},
			},
		});
		return search;
	} catch (error) {
		console.log(error);
	}
};

const getOrders = async (req, res) => {
	try {
		let orders = await Order_Items.findAll();
		return res.status(200).send(orders);
	} catch (err) {
		console.log(err);
		res.status(404).send(err);
	}
};

const getOrderId = async (req, res) => {
	try {
		const { id } = req.params;
		if (id) {
			const orders = await Order_Details.findAll();
			const orderFiltered = orders.filter(e => e.id == id);
			res.status(200).send(orderFiltered);
		}
	} catch (err) {
		console.log(err);
		res.status(404).send(err);
	}
};

const getInfoCategory = async () => {
	try {
		let search = await ProductCategory.findAll();
		// console.log(search.map(x => x.name))
		return search;
	} catch (error) {
		console.log(error);
	}
};

const getCategory = async (req, res, next) => {
	try {
		let search = await getInfoCategory();
		let categories = search.map(x => x.name);

		return res.status(200).send(categories);
	} catch (error) {
		next(error);
	}
};

const createCategory = async (req, res, next) => {
	let { name } = req.body;

	try {
		let createdCategory = await ProductCategory.create({
			name,
		});
		return res.status(201).send(createdCategory);
	} catch (error) {
		next(error);
	}
};

const getAllProducts = async (req, res, next) => {
	try {
		let search = await getInfoProducts();
		// console.log(search)

		let allProducts = [];
		for (let product of search) {
			allProducts.push({
				id: product.id,
				name: product.name,
				description: product.description,
				SKU: product.SKU,
				price: product.price,
				category: product.productCategories.map(x => x.name),
			});
		}

		return res.status(200).send(allProducts);
	} catch (error) {
		next(error);
	}
};

const createProduct = async (req, res) => {
	let { name, description, SKU, price, category } = req.body;
	try {
		let createdProduct = await Product.create({
			name,
			description,
			SKU,
			price,
			category,
		});

		let categoryDb = await ProductCategory.findAll({
			where: { name: category },
		});

		createdProduct.addProductCategory(categoryDb);

		return res.status(201).send("Product created");
	} catch (error) {
		next(error);
	}
};

const editProduct = async (req, res, next) => {
	const id = req.query.id;
	let { name, description, price } = req.body;

	// console.log(id)
	try {
		await Product.update({ name, description, price }, { where: { id: id } });

		let productUpdated = await Product.findOne({
			where: {
				id: id,
			},
		});
		return res.json({ productUpdated, msg: "product updated" });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getAllProducts,
	createProduct,
	editProduct,
	getCategory,
	createCategory,
	getOrderId,
	getOrderStatus,
	getOrders,
};
