const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
var flash = require('express-flash');
const { authenticate } = require("./middlewares/auth/authentication.js");
const { authorize } = require("./middlewares/auth/authorization.js");
require("dotenv").config();

const { DOMAIN } = process.env

require("./db.js");

const server = express();

server.name = "API";

server.use(express.urlencoded({ extended: true, limit: "50mb" }));
server.use(express.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", DOMAIN); // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Credentials", "true");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Permits");
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
	next();
});

server.use(authenticate);
// server.use(authorize);
server.use("/", routes);
server.use(flash())


// Error catching endware.
server.use((err, req, res, next) => {
	// eslint-disable-line no-unused-vars
	const status = err.status || 500;
	const message = err.message || err;
	console.error(err);
	res.status(status).send(message);
});

module.exports = server;
