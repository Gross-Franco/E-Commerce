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
const { mockproducts } = require("./src/mockData/mockproducts");
const { mockusers } = require("./src/mockData/mockusers");
const { mockcategories } = require("./src/mockData/mockcategories");
const { mockinventory } = require("./src/mockData/mockinventory");
const {
  conn,
  OrderDetails,
  User,
  Product,
  ProductCategory,
  ProductInventory,
} = require("./src/db.js");
const { PORT } = process.env;

// Syncing all the models at once.

conn.sync({ force: true }).then(() => {
  server.listen(PORT || 3001, () => {
    ProductCategory.bulkCreate(mockcategories);
    OrderDetails.bulkCreate(mockorders);
    User.bulkCreate(mockusers);
    Product.bulkCreate(mockproducts);
    ProductInventory.bulkCreate(mockinventory);
    console.log(`%s listening at ${PORT || 3001}`); // eslint-disable-line no-console
  });
});
