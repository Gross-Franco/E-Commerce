const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/products', async (req, res) => {
    try{
    const {name} = req.query;
    const allProducts = await getProducts();
    if(name){
        let productName = await allProducts.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
        productName.length ? res.status(200).send(productName) : res.status(404).send('raza no encontrada')
    } else {
        res.status(200).send(allProducts)
    }
    } 
    catch (err) {
        console.log(err)
        res.status(404).send(err)
    }
    
})
router.get('/products/:id', async (req,res)=> {
    const id = req.params.id;
    if(id){
    const allProducts = await getProducts();
    const FilteredProducts = allProducts.filter(e => e.id == id);
    FilteredProducts.length ? res.status(200).send(FilteredProducts) : res.status(404).send('El ID ingresado no existe')
   }
}) 



module.exports = router;
