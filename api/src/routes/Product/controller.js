const axios = require("axios");
const { Op } = require("sequelize");
const { Discount, ProductCategory, ProductInventory, Product } = require("../../db.js");

const getProducts = async (req, res, next) => {
	try {
		let productSearch = await Product.findAll({
			include: {
				model: ProductCategory,
				attributes: ['name'],
				through: {
					attributes: [],
				},
			}
		});
		let allProducts = await Promise.all(productSearch.map(async product => {
			let productData = product.dataValues;
			let productinv = await ProductInventory.findOne({where: {id:productData.inventory_id}});
			if(productinv.dataValues.quantity > 0) return {
				id: productData.id,
				name: productData.name,
				description: productData.description,
				SKU: productData.SKU,
				price: productData.price,
				category: productData.productCategories.map(x => x.name),
				quantity: productinv.quantity
			}
		}))
		let response = allProducts.filter(product => product != null)
		// console.log(allProducts)
		return res.status(200).json(response);
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
	const { name } = req.query;
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
