require("dotenv").config();
const { Op } = require("sequelize");

const {
  OrderDetails,
  OrderItems,
  PaymentDetails,
  Users
} = require("../../db.js");

const getOrders = async (req, res) => {
    try {
      let orders = await OrderDetails.findAll({
        include: { model: OrderItems, }
      });
      const response = await Promise.all(orders.map(async order => {
        let user = {}
        let payment = {}
        if (order.user_id) user = await Users.findOne({where: {id:order.user_id}})
        if (order.payment_id) payment = await PaymentDetails.findOne({where: {id:order.payment_id}})
        return {
          id: order.id,
          total: order.total,
          status: order.status,
          createdAt: order.createdAt,
          payment: {
            amount: payment.amount,
            provider: payment.provider,
            status: payment.status
          },
          user: {
            id: user.id,
            user: user.username,
            email: user.email,
          },
          orderItems: order.orderItems.map((item) => {
            return {product: item.product_id, quantity: item.quantity}
          }),
        }
      })) 
      res.status(200).send(response);
    } catch (err) {
      console.log(err);
      res.status(404).send(err);
    }
};

const getOrderId = async (req, res) => {
    try {
      const { id } = req.params;
      if (id) {
        const orders = await OrderDetails.findAll();
        const orderFiltered = orders.filter((e) => e.id == id);
        res.status(200).send(orderFiltered);
      }
    } catch (err) {
      console.log(err);
      res.status(404).send(err);
    }
};

const allStatus = async (req, res) => {
    const status = ['Created', 'Processing', 'Cancelled', 'Completed']
    res.json(status);
};

const filterOrderByStatus = async (req, res) => {
    try {
      const {status}  = req.body;
      console.log(status)
      const allOrders = await OrderDetails.findAll({
        include: {
          model: OrderItems,
          as: 'CartItems'
        }
      });
      console.log(allOrders)
      const map = allOrders.map(e => e.dataValues)
      console.log(map)
      const finalStatus = map.filter(e=> e.status === status)
       finalStatus.length? res.status(200).send(finalStatus) : res.status(404).send('no esta')
    } catch (err) {
      console.log(err);
      res.status(404).send(err);
    }
};

const changeOrderStatus = async (req, res) => {
    try {
      const { orderId, status } = req.body;
      const order = await OrderDetails.findByPk(orderId);
      order.set({
       status : status
        
      })
      await order.save();
      res.send(order);
    } catch (err) {
      console.log(err);
      res.status(404).send(err);
    }
};

module.exports = {
    getOrders,
    getOrderId,
    allStatus,
    filterOrderByStatus,
    changeOrderStatus
}