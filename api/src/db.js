require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { PassThrough } = require("stream");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
// const RefreshTokens = require("./models/Authentication/RefreshTokens.js")

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

// En sequelize.models est??n todos los modelos importados como propiedades
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
	ShoppingSession,
} = sequelize.models;

//User relations
User.hasMany(UserAddress, { foreignKey: "user_id", onDelete: 'cascade', hooks: true });
UserAddress.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(UserPayment, { foreignKey: "user_id", onDelete: 'cascade', hooks: true });
UserPayment.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(UserReviews, { foreignKey: "user_id", onDelete: 'cascade', hooks: true });
UserReviews.belongsTo(User, { foreignKey: "user_id" });

//Product relations
//categories
ProductCategory.belongsToMany(Product, { through: "product_Categories", foreignKey: "category_id" });
Product.belongsToMany(ProductCategory, { through: "product_Categories", foreignKey: "product_id" });
//inventory
ProductInventory.hasOne(Product, { foreignKey: "inventory_id" });
Product.belongsTo(ProductInventory, { foreignKey: "inventory_id", onDelete: "cascade" })
//discounts
Discount.hasMany(Product, { foreignKey: "discount_id" });
Product.belongsTo(Discount, { foreignKey: "discount_id", onDelete: "cascade" });

//Purchase order relations
PaymentDetails.hasOne(OrderDetails, { as: "OrderPayment", foreignKey: "payment_id" });
OrderDetails.belongsTo(PaymentDetails, { foreignKey: "payment_id" });
OrderDetails.hasMany(OrderItems, { foreignKey: "order_id" });
OrderItems.belongsTo(OrderDetails, { foreignKey: "order_id" });

//Shopping relations
ShoppingSession.hasMany(CartItems, { foreignKey: "session_id", onDelete: "cascade" });
CartItems.belongsTo(ShoppingSession, { foreignKey: "session_id" });

//Mixed relations
//Cart management
Product.hasMany(CartItems, { foreignKey: "product_id" })
CartItems.belongsTo(Product, { foreignKey: "product_id" })
User.hasOne(ShoppingSession, { as: "Session", foreignKey: "user_id", onDelete: "cascade" });
ShoppingSession.belongsTo(User, { foreignKey: "user_id" });

//Purchase order management
Product.hasMany(OrderItems, { as: "ToOrder", foreignKey: "product_id" }); 
OrderItems.belongsTo(Product, { foreignKey: "product_id" })
User.hasOne(OrderDetails, { as: "PurchaseOrder", foreignKey: "user_id" });
OrderDetails.belongsTo(User, { foreignKey: "user_id", allowNull: true })

//Reviews
Product.hasMany(UserReviews, { foreignKey: "product_id" });
UserReviews.belongsTo(Product, { foreignKey: "product_id" })

module.exports = {
	...sequelize.models, // para poder importar los modelos as??: const { Product, User } = require('./db.js');
	conn: sequelize, // para importart la conexi??n { conn } = require('./db.js');
};
