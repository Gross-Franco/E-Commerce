require('dotenv').config()
const axios = require('axios');
const {Discount, ProductCategory, ProductInventory, Product} = require ('../../db.js')


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

const getProducts = async (req, res) =>{
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
        {where: { id: id}}
    )
    return res.send('Product updated')
}


module.exports = {getProducts, createProduct, editProduct, getCategory, createCategory};