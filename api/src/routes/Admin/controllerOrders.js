require("dotenv").config();
const { Op } = require("sequelize");

const {
  OrderDetails,
  OrderItems,
} = require("../../db.js");

const getOrders = async (req, res) => {
    try {
      let orders = await OrderDetails.findAll({
        include: {
          model: OrderItems,
          as: 'CartItems'
        }
      });
      res.status(200).send(orders);
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