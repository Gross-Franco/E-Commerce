const paypal = require('@paypal/checkout-server-sdk')

const storeItems = new Map([
    [1, { price: 100, name: 'Best TV 4000'}],
    [2, { price: 150, name: 'Best PC 1000'}]
])

const Envioroment = process.env.NODE_ENV === 'production'
? paypal.core.LiveEnvironment
: paypal.core.SandboxEnvironment
const paypalClient = new paypal.core.PayPalHttpClient(new Envioroment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET))

const createOrder = async(req, res) =>{
    const request = new paypal.orders.OrdersCreateRequest()
    const total = req.body.items.reduce((sum, item) =>{
        return sum + storeItems.get(item.id).price * quantity
    }, 0) 
    request.prefer("return=representation")
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [
            {
                amount: {
                    currency_code: 'USD',
                    value: total,
                    breakdown:{
                        item_total:{
                            currency_code: 'USD',
                            value: total
                        }
                    }
                },
                items: req.body.items.map(item =>{
                    const storeItem = storeItems.get(item.id)
                    return{
                        name: storeItem.name,
                        unit_amount: {
                            currency_code: 'USD',
                            value: storeItem.price
                        },
                        quantity: item.quantity
                    }
                })
            }
        ]
    })

    try {
        const order = await paypalClient.execute(request)
        res.json({id: order.result.id})
        console.log(order)
    }catch(err){
        res.status(500).json({error: err.message})
    }
}

module.exports = {
	createOrder
};
