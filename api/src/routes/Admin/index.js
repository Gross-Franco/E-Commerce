const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// router.post('/addproduct', async (req, res) => {
//     const { name, description, price, image, category } = req.body;
//     try{
//         if (!name || !description || !price || !image)
//           return res.status(404).send("El nombre, descripcion, imagen y precio son requeridos");
//         const creatingProduct = await Product.create({
//           name,
//           description,
//           price,
//           image,
//         });
//         let prod = await Product_Category.findAll({
//             where: {name: category}
//         })
//          await creatingProduct.addProduct_Category(prod)
       
//         res.status(200).send(creatingProduct)
//       }
    
//       catch(err){
//         console.log(err)
//         res.status(404).send(err)
//       }
    
// })
 router.get('/orders', async (req, res) => {
    try{    
    let orders = await Order_Items.findAll()
  res.status(200).send(orders)
    } 
    catch(err) {
        console.log(err)
        res.status(404).send(err)
    }
 })

 router.get('/orders/:id', async (req, res) => {
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
 })

module.exports = router;
