const { Product } = require('../../db.js')

const  Cart = async (req, res) => {
    let cart = [];
    const {name} = req.body;
    try {
    const product = await Product.findAll({
        attributes: [name]
    })
    if(product.includes(name)){
        cart.push(name)
    }
    }
 catch (error) {
    console.log(error)
    res.send(error)
}
}

const TotalPrice = (req, res) => {
  const {price} = req.body;
  let total = 0
  if(price){
      total += price
      res.send(total)
  }
}

const deleteProductFromCart = async (req, res) => {
    try{
        const {id} = req.params;
         if(id){
             const product = await Product.findAll()
             const Deleted = product.filter(e => e.id == id)
             res.status(200).send(Deleted)
         }
        }
         catch(error) {
           console.log(error)
           res.status(404).send(error)
         }
   

}

module.exports = {Cart, TotalPrice, deleteProductFromCart}
