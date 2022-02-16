

export const getProducts = async (req,res)=> {
    const id = req.params.id;
    if(id){
    const allProducts = await getProducts();
    const FilteredProducts = allProducts.filter(e => e.id == id);
    FilteredProducts.length ? res.status(200).send(FilteredProducts) : res.status(404).send('El ID ingresado no existe')
   }
}

export const searchProductName = async (req, res) => {

}