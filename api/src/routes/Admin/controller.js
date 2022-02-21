require('dotenv').config()
const axios = require('axios');

const {Discount, ProductCategory, ProductInventory, Product, OrderDetails, OrderItems} = require ('../../db.js');
const User = require('../../models/User_Management/User.js');


const getOrderStatus = async (req, res)=> {
    try {
        const status = await OrderDetails.findAll({
            attributes : ['status']
        })
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
    let orders = await OrderItems.findAll()
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
         const orders = await OrderDetails.findAll()
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

        let inventory = await ProductInventory.findOne(
            {
                where: {id: product.productInventoryId}
            }
        )

        // console.log(inventory.quantity)

        allProducts.push({
            id: product.id,
            name: product.name,
            description: product.description,
            SKU: product.SKU,
            price: product.price,
            category: product.productCategories.map(x => x.name),
            inventoryId: product.productInventoryId,
            quantity: inventory.quantity
            
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
        category,
        quantity
    } = req.body
    try{

        
        let createdInventory = await ProductInventory.create({
            quantity
        })
        
        let createdProduct = await Product.create({
            name,
            description,
        SKU,
        price,
        category,
        productInventoryId: createdInventory.id
    })

		let categoryDb = await ProductCategory.findAll({
            where: { name: category },
		});
        
		createdProduct.addProductCategory(categoryDb);
        
		return res.status(201).send("Product created");
        
	} catch (error) {
		next(error);
	}
};


const editProduct = async (req, res, next) => {
	const id = req.query.id;
	let { name, description, price } = req.body;

	// console.log(id)
	try {
		await Product.update({ name, description, price }, { where: { id: id } });

		let productUpdated = await Product.findOne({
			where: {
				id: id,
			},
		});
		return res.json({ productUpdated, msg: "product updated" });
	} catch (error) {
		next(error);
	}
};
const allStatus = async (req, res) => {
    const status = await OrderDetails.findAll({
        attributes: ['status']
    })
        res.send(status)
}

const addToInvetory = async(req, res) => {
    let {
        quantity,
        id
    } = req.body

    let product = await ProductInventory.findOne({
        where: {id: id}
    })

    // console.log(product)

    await product.increment('quantity', {by: quantity})    

    res.json({msg: "increased inventory", product})
}

const removeFromInvetory = async(req, res) => {
    let {
        quantity,
        id
    } = req.body

    let product = await ProductInventory.findOne({
        where: {id: id}
    })

    await product.decrement('quantity', {by: quantity})    

    res.json({msg: "decreased inventory", product})
}


async function editProduct(req, res) {
    const id = req.query.id;
    let {
        name, description, price,
    } = req.body;

    // console.log(id)
    Product.update(
        {
            name,
            description,
            price
        },
        { where: { id: id } }
    );

    let productUpdated = await Product.findOne({
        where: {
            id: id
        }
    });
    return res.json({ productUpdated, msg: "product updated" });
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

const deleteUser = async(req, res) =>{
    let {
        email
    } = req.body

    User.destroy(
        {where: {email: email}}
    )

    req.status(200).send("User deleted")
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
    createAdmin,
    addToInvetory,
    removeFromInvetory,
      allStatus,
    deleteUser

};
