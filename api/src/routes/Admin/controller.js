require('dotenv').config()
const axios = require('axios');
const {Discount, ProductCategory, ProductInventory, Product} = require ('../../db.js')

const getOrderStatus = async (req, res)=> {
    try {
        const status = await Order_Details.status.findAll()
        res.status(200).send(status)
    } catch (err) {
        console.log(err)
        res.status(404).send(err)
        
    }
}

const getInfoProducts = async () =>{
    let search = await Product.findAll({
        include:
        {
            model: ProductCategory,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
    return search
}

const getOrders = async (req, res) => {
    try{    
    let orders = await Order_Items.findAll()
  res.status(200).send(orders)
    } 
    catch(err) {
        console.log(err)
        res.status(404).send(err)
    }
 }

const getOrderId = async (req, res) => {
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

const getInfoCategory = async () =>{
    let search = await ProductCategory.findAll()
    // console.log(search.map(x => x.name))
    return search
}

const getCategory = async (req, res) =>{
    let search = await getInfoCategory()
    let categories = search.map(x => x.name)

    res.status(200).send(categories)
}

const createCategory = async (req, res) =>{
    let {name} = req.body

    let createdCategory = await ProductCategory.create({
        name
    })
    res.send(createdCategory)
}

const getAllProducts = async (req, res) =>{
    let search = await getInfoProducts()
    console.log(search)

    let allProducts = []
    for(product of search){
        allProducts.push({
            id: product.id,
            name: product.name,
            description: product.description,
            SKU: product.SKU,
            price: product.price,
            category: product.productCategories.map(x => x.name)
        })
    }

    res.status(200).send(allProducts)
}

const createProduct = async (req, res) => {
    let {
        name,
        description,
        SKU,
        price,
        category
    } = req.body

    let createdProduct = await Product.create({
        name,
        description,
        SKU,
        price,
        category
    })

    let categoryDb = await ProductCategory.findAll({
        where: {name: category}
    })
    
    createdProduct.addProductCategory(categoryDb)

    res.send('Product created')
    
}

const editProduct = async (req, res) => {
    let {
        name,
        description,
        price,
        id
    } = req.body

    Product.update(
        {name: name,
        description: description,
        price: price},
        {where: { id: id }}
    )
    return res.send('Product updated')
}


module.exports = {
    getAllProducts,
    createProduct, 
    editProduct, 
    getCategory, 
    createCategory, 
    getOrderId, 
    getOrderStatus, 
    getOrders
};

