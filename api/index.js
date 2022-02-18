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
const server = require('./src/app.js');
const {mockorders} = require('./src/mockData/mockorders')
const {mockproducts} = require('./src/mockData/mockproducts')
const {mockusers} = require('./src/mockData/mockusers')
const { conn, OrderDetails, User, Product } = require('./src/db.js');
const {PORT}= process.env
// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(PORT||3001, () => {
    OrderDetails.bulkCreate(mockorders);
    User.bulkCreate(mockusers);
    Product.bulkCreate(mockproducts);
    console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
  });
});
