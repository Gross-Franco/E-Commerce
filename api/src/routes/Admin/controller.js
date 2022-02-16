require('dotenv').config()
const axios = require('axios');
const {Discount, Product_Category, Product_Inventory, Product} = require ('../../db.js')

const getProducts = async (req, res) =>{
    let search = await Product.findAll()
    return res.send(search)
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
        price
    })

    let categoryDb = await Product_Category.findAll({
        where: {name: category}
    })
    
    createdProduct.addCategory(categoryDb)

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


module.exports = {getProducts, createProduct, editProduct};