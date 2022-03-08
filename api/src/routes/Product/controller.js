const axios = require("axios");
const { Op } = require("sequelize");
const { Discount, ProductCategory, ProductInventory, Product, UserReviews, User } = require("../../db.js");

const getProducts = async (req, res, next) => {
	try {
		let productSearch = await Product.findAll({
			include: {
				model: ProductCategory,
				attributes: ['name']
			}
		});
		let allProducts = await Promise.all(productSearch.map(async product => {
			let productData = product.dataValues;
			let productinv = await ProductInventory.findOne({where: {id:productData.inventory_id}});
			if(productinv.dataValues.quantity > 0) return {
				id: productData.id,
				name: productData.name,
				image: productData.image,
				description: productData.description,
				image:productData.image,
				SKU: productData.SKU,
				price: productData.price,
				inactive: productData.inactive,
				category: productData.productCategories.map(x => x.name),
				inventory: productinv.quantity
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
	
	console.log(req.body)

	const categories  = req.body;
	try {
		const filtered = await Product.findAll({
			include: {
				model: ProductCategory,
				where: {
					name: categories
				}
			},
		});
		let response = [];
		for (let product of filtered) {
			let inventory = await ProductInventory.findOne({
				where: { id: product.inventory_id },
			});
			inventory.quantity > 0 && response.push({
				id: product.id,
				name: product.name,
				image: product.image,
				description: product.description,
				SKU: product.SKU,
				price: product.price,
				category: product.productCategories.map((x) => x.name),
				quantity: inventory.quantity,
			});
		}

		res.json(response);
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
		const productDetail = await Product.findOne({
			where: {
				id:id
			},
			include: [
				{
					model: ProductCategory
				},
			]
		})
		let inventory = await ProductInventory.findOne({
			where: { id: productDetail.inventory_id },
		});
		let reviews = await UserReviews.findAll({
			where: { product_id: id },
			include: {
				model: User,
				attributes: ['username']
			}
		})
		let response = {
			id: productDetail.id,
			name: productDetail.name,
			image: productDetail.image,
			description: productDetail.description,
			SKU: productDetail.SKU,
			price: productDetail.price,
			quantity: inventory.quantity,
			category: productDetail.productCategories.map((x) => x.name),
			reviews: reviews.map(r => {
				return {
					id: r.dataValues.id, 
					description: r.dataValues.description,
					starsPoints: r.dataValues.starsPoints,
					user: r.dataValues.user.dataValues.username}
			})
		};
		res.json(response);
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
			include: { model: ProductCategory }
		});
		let response = []
		for (let product of productsByName) {
			let inventory = await ProductInventory.findOne({
				where: { id: product.inventory_id },
			});
			inventory.quantity > 0 && response.push({
				id: product.id,
				name: product.name,
				image: product.image,
				description: product.description,
				SKU: product.SKU,
				price: product.price,
				inactive: product.inactive,
				category: product.productCategories.map((x) => x.name),
				quantity: inventory.quantity,
			});
		}
		res.json(response);
	} catch (err) {
		console.log(err);
		res.status(404).send(err);
	}
};

// const getProductReviews = async (req, res) => {
// 	const {productid} = req.params;

// 	try {
// 		const reviews = await UserReviews.findAll({
// 			where: {product_id: productid}
// 		})
// 		res.json(reviews)
// 	} catch(err) { 
// 		console.log(err)
// 	}
// }

module.exports = {
	getProducts,
	getProductId,
	searchProductName,
	filterByCategory,
};
