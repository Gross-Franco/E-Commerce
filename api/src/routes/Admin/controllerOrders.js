require("dotenv").config();
const { Op } = require("sequelize");

const {
  OrderDetails,
  OrderItems,
  PaymentDetails,
  User,
  Product
} = require("../../db.js");

const getOrders = async (req, res) => {
    try {
      let orders = await OrderDetails.findAll({
        include: { model: OrderItems, }
      });
      const response = await Promise.all(orders.map(async order => {
        let user = {}
        let payment = {}
        if (order.user_id) user = await User.findOne({where: {id:order.user_id}})
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
          orderItems: await Promise.all(order.orderItems.map(async item => {
            let product = await Product.findByPk(item.product_id)
            return {product: product.name, quantity: item.quantity}
          })),
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
      const orders = await OrderDetails.findByPk(id);
      res.status(200).send(orders);
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
    let orders = await OrderDetails.findAll({
      where: {status:status},
      include: { model: OrderItems, }
    });
    const response = await Promise.all(orders.map(async order => {
      let user = {}
      let payment = {}
      if (order.user_id) user = await User.findOne({where: {id:order.user_id}})
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
        orderItems: await Promise.all(order.orderItems.map(async item => {
          let product = await Product.findByPk(item.product_id)
          return {product: product.name, quantity: item.quantity}
        })),
      }
    })) 
    res.status(200).send(response);
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
      status: status
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