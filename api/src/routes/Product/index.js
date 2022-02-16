const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const productRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
productRouter.get('/product/:id', async (req,res)=> {
    const id = req.params.id;
    if(id){
    const allProducts = await getProducts();
    const FilteredProducts = allProducts.filter(e => e.id == id);
    FilteredProducts.length ? res.status(200).send(FilteredProducts) : res.status(404).send('El ID ingresado no existe')
   }
})

module.exports = productRouter;
