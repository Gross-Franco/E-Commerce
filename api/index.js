//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { mockorders } = require("./src/mockData/mockorders");
const { mockorderitems } = require("./src/mockData/mockorderItems")
const { mockproducts } = require("./src/mockData/mockproducts");
const { mockusers } = require("./src/mockData/mockusers");
const { mockcategories } = require("./src/mockData/mockcategories");
const { mockinventory } = require("./src/mockData/mockinventory");
const { mockpaymentdetails } = require("./src/mockData/mockpaymentdetails");

const {
  conn,
  OrderDetails,
  OrderItems,
  User,
  Product,
  ProductCategory,
  ProductInventory,
  PaymentDetails
} = require("./src/db.js");
// const { mockorderItems } = require("./src/mockData/mockorderItems.js");
const { PORT, TESTING } = process.env;

// Syncing all the models at once.

conn.sync({ force: TESTING || false }).then(() => {

  server.listen(PORT || 3001, () => {
    ProductInventory.bulkCreate(mockinventory)
      .then(() => {
        return Product.bulkCreate(mockproducts)
      })
      .then(() => {
        return ProductCategory.bulkCreate(mockcategories)
      })
      .then(() => {
        return Product.findAll()
      })
      .then(products => {
        products.forEach(product => {
          product.addProductCategory(Math.random() * (mockcategories.length - 1) + 1)
        })
      })
      .then(() => {
        return User.bulkCreate(mockusers);
      })
      .then(() => {
        return PaymentDetails.bulkCreate(mockpaymentdetails)
      })
      .then(() => {
        return OrderDetails.bulkCreate(mockorders)
      })
      .then(() => {
        return OrderItems.bulkCreate(mockorderitems)
      })
      .catch(error => console.log(error));
    console.log(`%s listening at ${PORT || 3001} `); // eslint-disable-line no-console

  });
});
