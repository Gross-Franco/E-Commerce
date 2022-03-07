
// const paypal = require('@paypal/checkout-server-sdk')
require('dotenv').config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
var nodemailer = require('nodemailer');
const { uuid } = require('uuidv4');
const { MAIL_USER, MAIL_PASS, MAIL_HOST, MAIL_PORT } = process.env
const {
  ProductInventory,
  Product
} = require("../../db.js");

// const storeItems = new Map([
//     [1, { price: 100, name: 'Best TV 4000'}],
//     [2, { price: 150, name: 'Best PC 1000'}]
// ])

// const Envioroment = process.env.NODE_ENV === 'production'
// ? paypal.core.LiveEnvironment
// : paypal.core.SandboxEnvironment
// const paypalClient = new paypal.core.PayPalHttpClient(new Envioroment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET))

// const createOrder = async(req, res) =>{
//     const request = new paypal.orders.OrdersCreateRequest()
//     const total = req.body.items.reduce((sum, item) =>{
//         return sum + storeItems.get(item.id).price * quantity
//     }, 0) 
//     request.prefer("return=representation")
//     request.requestBody({
//         intent: 'CAPTURE',
//         purchase_units: [
//             {
//                 amount: {
//                     currency_code: 'USD',
//                     value: total,
//                     breakdown:{
//                         item_total:{
//                             currency_code: 'USD',
//                             value: total
//                         }
//                     }
//                 },
//                 items: req.body.items.map(item =>{
//                     const storeItem = storeItems.get(item.id)
//                     return{
//                         name: storeItem.name,
//                         unit_amount: {
//                             currency_code: 'USD',
//                             value: storeItem.price
//                         },
//                         quantity: item.quantity
//                     }
//                 })
//             }
//         ]
//     })

//     try {
//         const order = await paypalClient.execute(request)
//         res.json({id: order.result.id})
//         console.log(order)
//     }catch(err){
//         res.status(500).json({error: err.message})
//     }
// }

//payment route using stripe


const payment = async(req, res) =>{
    const {product, token} = req.body;
    console.log("PRODUCT", product);
    // console.log("PRICE", product.price);
    // console.log("TOKEN", token);

    idempotencyKey = uuid()
    //we create a customer
    return stripe.customers.create({
        email: token.email,
        source: token.id
        //if its successfull we create the charge
    }).then(customer =>{
      // console.log(customer)
        return stripe.charges.create({
            //multiply by 100 because everything goes using cents
            amount: product.price *100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: product.name,
            shipping: {
                name: token.card.name,
                address: {
                    line1: token.card.address_line1,
                    country: token.card.address_country
                }
            }
        },{idempotencyKey} )
    }).then(result => {
        // console.log("RESULT", result)
        var transporter = nodemailer.createTransport({
          host: MAIL_HOST,
          port: MAIL_PORT,
          secure: true, // true for 465, false for other ports
          tls: {
            rejectUnauthorized: false,
          },
          auth: {
            user: MAIL_USER, 
            pass: MAIL_PASS,
          },
        });
        const options = {
          from: "HENRY e-Commerce <" + MAIL_USER + ">",
          to: result.receipt_email,
          subject: "Your purchase at HENRY e-Commerce",
          html: `<h2>Thank you for your purchase<h2>
                <p>This is a confirmation for your purchase today of ${product.name} your items will arrive in the following days for any questions send us a questions at welcome@hcommerce.store.<p>
              `,
        };
          // this function sends the email using the information for options
          transporter.sendMail(options, function (err, info) {
            if (err) {
              console.log(err)
              return;
            }
            console.log('email sent ' + info.response)
            res.json({ message: `sent user purhcase confirmation at: ${result.receipt_email}` })


            
          })
          //we search for the products that were bought, and decrease their inventory by the quantity
          //need to define the quantities as its own variable
          let quantities = product.quantity
          product.id.forEach(async (product, i) =>{
            const productochange = await Product.findOne({
              where: {
                id: product
              }
            })
          const productToDecrease = await ProductInventory.findOne({
            where:{
              id: productochange.inventory_id
            }
          })
          // console.log(productToDecrease.quantity)
          // console.log(i)
          await productToDecrease.decrement("quantity", { by: quantities[i] });
          productToDecrease.changed('quantity', true);
          // console.log(productToDecrease.changed());
          // console.log(productToDecrease.quantity)
          await productToDecrease.save()
        })
        res.status(200).json(result)})
        .catch(err => console.log(err))

    
}




module.exports = {
	// createOrder,
    payment
};