require('dotenv').config()
const axios = require('axios');
const {Discount, ProductCategory, ProductInventory, Product, User} = require ('../../db.js')

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

const addCategoryToProduct = async (req, res) =>{
    let {
        id,
        category
    } = req.body

    let categoryDb = await ProductCategory.findAll({
        where: {name: category}
    })

    let product = await Product.findOne({
        where: {id: id}
    })

    product.addProductCategory(categoryDb)

    res.json({product, msg: "added category to product"})
}

const removeCategoryFromProduct = async (req, res) =>{
    let {
        id,
        category
    } = req.body

    let categoryDb = await ProductCategory.findAll({
        where: {name: category}
    })

    let product = await Product.findOne({
        where: {id: id}
    })

    product.removeProductCategory(categoryDb)

    res.json({product, msg: "removed category to product"})
}


const getAllProducts = async (req, res) =>{
    let search = await getInfoProducts()
    // console.log(search)

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
        quantity,
        category
    } = req.body

    let createdInventory = await ProductInventory.create({
        quantity
    })
    
    let createdProduct = await Product.create({
        name,
        description,
        SKU,
        price,
        category,
        inventoryId
    })

    let categoryDb = await ProductCategory.findAll({
        where: {name: category}
    })

    createdProduct.addProductCategory(categoryDb)

    res.json({createdProduct, msg: 'Product created'})
    
}

const editProduct = async (req, res) => {
    const id = req.query.id
    let {
        name,
        description,
        price,
    } = req.body

    // console.log(id)

    Product.update(
        {name,
        description,
        price},
        {where: { id: id }}
    );

    let productUpdated = await Product.findOne({
        where: {
            id: id
        }
    });
    return res.json({productUpdated, msg: "product updated"})
}

const createAdmin = async (req, res) =>{
    let {
        id
    } = req.body

    User.update(
        {
            isAdmin: true
        },
        {where: { id: id}}
    )

    let updatedUser = await User.findOne({
        where: {id: id}
    })

    res.json({updatedUser, msg: "User changed to admin"})
}


module.exports = {
    getAllProducts,
    createProduct, 
    editProduct, 
    getCategory, 
    createCategory,
    addCategoryToProduct,
    removeCategoryFromProduct, 
    getOrderId, 
    getOrderStatus, 
    getOrders,
    createAdmin
};

