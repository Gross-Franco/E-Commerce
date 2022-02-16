
export const getOrders = async (req, res) => {
    try{    
    let orders = await Order_Items.findAll()
  res.status(200).send(orders)
    } 
    catch(err) {
        console.log(err)
        res.status(404).send(err)
    }
 }

export const getOrderId = async (req, res) => {
    try{
    const {id} = req.params;
     if(id){
         const orders = await Order_Details.findAll()
         const orderFiltered = orders.filter(e => e.id == id)
         res.status(200).send(orderFiltered)
     }
    } 
    catch(err){
        console.log(err)
        res.status(404).send(err)
    }
 }

export const getOrderStatus = async (req, res)=> {
    try {
        const status = await Order_Details.status.findAll()
        res.status(200).send(status)
    } catch (err) {
        console.log(err)
        res.status(404).send(err)
        
    }
}