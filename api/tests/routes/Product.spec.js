/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Product, conn } = require("../../src/db.js");

const agent = session(app);
const productDummy = {
	name: "Patata",
	description: "es una patata",
	price: 1.5,
	SKU: "Algo",
};

describe("Product routes", () => {
	before(() =>
		conn.authenticate().catch(err => {
			console.error("Unable to connect to the database:", err);
		})
	);
	describe("basic GET /product", () => {
		beforeEach(() => Product.sync({ force: true }).then(() => Product.create(productDummy)));
		it("should get 200", () => agent.get("/product").expect(200));
		it("should return an array", () => agent.get("/product").expect([]));
	});
	describe("specialized Get /product", () => {
		before(() => Product.sync({ force: true }));
		it("it should return 404 if there are no products", () => agent.get("/product").expect(404));
		before(() => Product.sync({ force: true }).then(() => Product.create(productDummy)));
		it("it should return the product with the specified name", () =>
			agent.get("/product?name=Patata").expect({ productDummy }));
	});
});
