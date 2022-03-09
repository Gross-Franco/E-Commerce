const axios = require("axios");
const { Op, col } = require("sequelize");
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
			if(productinv.dataValues.quantity > 0 && !product.inactive) return {
				id: productData.id,
				name: productData.name,
				image: productData.image,
				description: productData.description,
				image: productData.image,
				SKU: productData.SKU,
				price: productData.price,
				inactive: productData.inactive,
				category: productData.productCategories.map(x => x.name),
				inventory: productinv.quantity
			}
		}))
		let response = allProducts.filter(product => product != null)
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

const filterByCategory = async (req, res) => {
	const {categories}  = req.body;
	console.log(categories)
	try {
		let productSearch = await Product.findAll({
			include: {
				model: ProductCategory,
				where: {
					name: categories
				},
			}
		});
		let filteredProducts = await Promise.all(productSearch.map(async product => {
			let productData = product.dataValues;
			let productinv = await ProductInventory.findOne({where: {id:productData.inventory_id}});
			if(productinv.dataValues.quantity > 0 && !product.inactive) return {
				id: productData.id,
				name: productData.name,
				image: productData.image,
				description: productData.description,
				image: productData.image,
				SKU: productData.SKU,
				price: productData.price,
				inactive: productData.inactive,
				category: productData.productCategories.map(x => x.name),
				inventory: productinv.quantity
			}
		}))
		let response = filteredProducts.filter(product => product != null)
		return res.status(200).json(response);
	} catch (error) {
		console.log(error);
	}

	// try {
	// 	const filtered = await Product.findAll({
	// 		include: {
	// 			model: ProductCategory,
	// 			where: {
	// 				name: categories
	// 			}
	// 		},
	// 	});
	// 	let response = [];
	// 	for (let product of filtered) {
	// 		let inventory = await ProductInventory.findOne({
	// 			where: { id: product.inventory_id },
	// 		});
	// 		inventory.quantity > 0 && response.push({
	// 			id: product.id,
	// 			name: product.name,
	// 			image: product.image,
	// 			description: product.description,
	// 			SKU: product.SKU,
	// 			price: product.price,
	// 			category: product.productCategories.map((x) => x.name),
	// 			quantity: inventory.quantity,
	// 		});
	// 	}

	// 	res.json(response);
	// } catch (err) {
	// 	console.log(err);
	// 	res.status(404).send(err);
	// }
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

const orderProducts = async (req, res) => {
	const {column, order} = req.body;
	console.log(column, order)
	try {
		let productSearch = await Product.findAll({
			order: [
				[column, order]
			],
			include: {
				model: ProductCategory,
				attributes: ['name']
			},
		});
		let orderedProducts = await Promise.all(productSearch.map(async product => {
			let productData = product.dataValues;
			let productinv = await ProductInventory.findOne({where: {id:productData.inventory_id}});
			if(productinv.dataValues.quantity > 0 && !product.inactive) return {
				id: productData.id,
				name: productData.name,
				image: productData.image,
				description: productData.description,
				image: productData.image,
				SKU: productData.SKU,
				price: productData.price,
				inactive: productData.inactive,
				category: productData.productCategories.map(x => x.name),
				inventory: productinv.quantity
			}
		}))
		let response = orderedProducts.filter(product => product != null)
		return res.status(200).json(response);
	} catch (error) {
		console.log(error);
	}


}


module.exports = {
	getProducts,
	getProductId,
	searchProductName,
	filterByCategory,
	orderProducts,
};
