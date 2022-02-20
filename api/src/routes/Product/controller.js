const axios = require("axios");
const { Op } = require("sequelize");
const { Discount, ProductCategory, ProductInventory, Product } = require("../../db.js");

const getProducts = async (req, res, next) => {
	try {
		let products = await Product.findAll({
			include: {
				model: ProductInventory,
				where: {
					quantity: {
						[Op.gt]: 0,
					},
				},
			},
		});
		return res.status(200).json(products);
	} catch (error) {
		next(error);
	}
};

const filterByCategory = async (req, res) => {
	const { category } = req.params;
	if (typeof category != "string" || !category) {
		res.status(404).send("Invalid category");
	}
	try {
		const filtered = await Product.findAll({
			include: {
				model: ProductCategory,
				where: {
					name: category,
				},
			},
		});
		res.json(filtered);
	} catch (err) {
		console.log(err);
		res.status(404).send(err);
	}
};

const getProductId = async (req, res) => {
	const { id } = req.params;
	if (!id ||  isNaN(Number(id))) { 
		res.status(404).send("Invalid ID");
	}
	try {
		//const productDetail = await Product.findByPk(id);
		const productDetail = await Product.findOne(
			{
				where:{
					id:id
				}
			}
		)
		res.json(productDetail);
	} catch (err) {
		console.log(err);
		res.status(404).send(err);
	}
};

const searchProductName = async (req, res) => {
	const { name } = req.params;
	if (!name || typeof name !== "string") { 
		return res.status(404).send("Invalid name");
	}
	try {
		let productsByName = await Product.findAll({
			where: {
				name: {
					[Op.iLike]: "%" + name + "%",
				},
			},
		});
		res.json(productsByName);
	} catch (err) {
		console.log(err);
		res.status(404).send(err);
	}
};

module.exports = {
	getProducts,
	getProductId,
	searchProductName,
	filterByCategory,
};
