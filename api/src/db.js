require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { PassThrough } = require("stream");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

let sequelize = process.env.NODE_ENV === 'production'
	? new Sequelize({
		database: DB_NAME,
		dialect: "postgres",
		host: DB_HOST,
		port: 5432,
		username: DB_USER,
		password: DB_PASSWORD,
		pool: {
			max: 3,
			min: 1,
			idle: 10000,
		},
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false
			},
			keepAlive: true,
		},
		ssl: true,
	})
	: new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/ecommerce`, {
		logging: false, // set to console.log to see the raw SQL queries
		native: false, // lets Sequelize know we can use pg-native for ~30% more speed
	});


sequelize.authenticate().then(
	success => {
		console.log("Connection ok");
	},
	error => {
		console.log("Failed conncection, reason :" + error);
	}
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models/Product_Mangement"))
	.filter(file => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js")
	.forEach(file => {
		modelDefiners.push(require(path.join(__dirname, "/models/Product_Mangement", file)));
	});

fs.readdirSync(path.join(__dirname, "/models/User_Management"))
	.filter(file => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js")
	.forEach(file => {
		modelDefiners.push(require(path.join(__dirname, "/models/User_Management", file)));
	});

fs.readdirSync(path.join(__dirname, "/models/Shopping_Session"))
	.filter(file => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js")
	.forEach(file => {
		modelDefiners.push(require(path.join(__dirname, "/models/Shopping_Session", file)));
	});

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map(entry => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
	Discount,
	ProductCategory,
	ProductInventory,
	Product,

	UserAddress,
	UserPayment,
	User,
	UserReviews,

	CartItems,
	OrderDetails,
	OrderItems,
	PaymentDetails,
	ShoppingSession
} = sequelize.models;

//User relations
User.hasMany(UserAddress, { foreignKey: "user_id", onDelete: 'cascade', hooks: true });
User.hasMany(UserPayment, { foreignKey: "user_id", onDelete: 'cascade', hooks: true });
User.hasMany(UserReviews, { foreignKey: "user_id", onDelete: 'cascade', hooks: true });

//Product relations
ProductInventory.hasOne(Product, { foreignKey: "inventory_id" });
ProductCategory.belongsToMany(Product, { through: "product_Categories", foreignKey: "category_id" });
Product.belongsToMany(ProductCategory, { through: "product_Categories", foreignKey: "product_id" });
Discount.hasMany(Product, { foreignKey: "discount_id" });

//Shopping relations
PaymentDetails.hasOne(OrderDetails, { as: "OrderPayment", foreignKey: "payment_id" });
OrderDetails.hasMany(OrderItems, { foreignKey: "order_id" });
ShoppingSession.hasMany(CartItems, { foreignKey: "session_id" });

//Mixed relations
Product.hasMany(OrderItems, {  foreignKey: "product_id" });
User.hasOne(OrderDetails, { as: "PurchaseOrder", foreignKey: "user_id" });
User.hasOne(ShoppingSession, { as: "Session", foreignKey: "user_id" });
ShoppingSession.belongsTo(User, { foreignKey: "user_id" });
Product.hasMany(UserReviews, { foreignKey: "review_id" });
Product.hasMany(CartItems, { foreignKey: "product_id" })

module.exports = {
	...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
	conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
