require("dotenv").config();
// const axios = require('axios');
const { User, UserAddress, UserPayment, Product, Review } = require("../../db.js");
// const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
// const { NOEXPAND } = require("sequelize/types/table-hints");
// const { FIRM } = process.env;

const getUserInfo = async () => {
	let search = User.findAll({
		include: [UserAddress],
	});
	return search;
};
const getUsers = async (req, res, next) => {
	try {
		let search = await getUserInfo();

		return res.status(200).send(search);
	} catch (error) {
		next(error);
	}
};

const createUser = async (req, res, next) => {
	let { username, password, first_name, last_name, email, isAdmin } = req.body;

	// const passwordHash = await bcrypt.hash(password, 10);
	try {
		let createdUser = await User.create({
			username,
			password,
			first_name,
			last_name,
			email,
			isAdmin,
		});

		return res.status(201).json({ createdUser, msg: "User created" });
	} catch (error) {
		next(error);
	}
};

const addAdress = async (req, res, next) => {
	let { addressLine1, addressLine2, city, postalCode, country, telephone, mobile, userId } = req.body;

	try {
		let createdAddress = await UserAddress.create({
			addressLine1,
			addressLine2,
			city,
			postalCode,
			country,
			telephone,
			mobile,
			userId,
		});
		return res.status(201).json({ createdAddress, msg: "added address" });
	} catch (error) {
		next(error);
	}
};

const postReviewProduct = async (req, res) => {
	// si se envia el token
	//let {id}=jwt.decode(req.headers['authorization'].split(' ')[1])
	// de lo contrario se envia el id del usuario de forma manual
	//let {userID}= req.query
	// per es necesario un identificador para buscar el usuario en la base de datos
	// o si se usar cookie-session
	// let {usAuth}= req.session
	// let {id} = jwt.decode(usAuth)
	try {
		let { idProduct } = req.params;
		if (req.body) {
			if (req.body.hasOneProperty("description") && typeof req.body["description"] !== "string") {
				throw Error("Data types error ");
			}
			if (req.body.hasOneProperty("starsPoint") && typeof req.body["starsPoint"] !== "number") {
				throw Error("Data types error ");
			}
		}
		let product = await Product.findOne({ where: { id: idProduct } });
		!product && new Error("Product no found");
		let review = await Review.create(req.body);
		// dara un error si no hay una id de un usuario
		User.findOne({ where: { id: id } }).then(
			result => {
				review.addUser(result);
				product.setReview(review);
				res.status(201).json({ success: true, inf: "Review add to Product" });
			},
			error => {
				res.status(400).json({ success: false, inf: "user nof found: " + error });
			}
		);
	} catch (e) {
		res.status(400).json({ success: false, inf: e });
	}
};

module.exports = { createUser, getUsers, addAdress, postReviewProduct };
