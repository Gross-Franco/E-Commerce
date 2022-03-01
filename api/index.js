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
const { mockorderItems } = require("./src/mockData/mockorderItems")
const { mockproducts } = require("./src/mockData/mockproducts");
const { mockusers } = require("./src/mockData/mockusers");
const { mockcategories } = require("./src/mockData/mockcategories");
const { mockinventory } = require("./src/mockData/mockinventory");
const { mockpaymentdetails } = require("./src/mockData/mockpaymentdetails")
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
  server.listen(PORT, () => {
//     ProductInventory.bulkCreate(mockinventory).then(() => {
//       Product.bulkCreate(mockproducts).then(() => {
//         ProductCategory.bulkCreate(mockcategories).then(() => {
//           Product.findAll().then(products => {
//             products.forEach(product => {
//               product.addProductCategory(1);
//             })
//           })
//         })
//       })
//     }).catch(error => console.log(error));
//     OrderDetails.bulkCreate(mockorders);
//     OrderItems.bulkCreate(mockorderItems)
//     User.bulkCreate(mockusers);
    console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
  });
});
