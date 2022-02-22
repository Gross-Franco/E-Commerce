require("dotenv").config();
const axios = require("axios");
const { filter } = require("bluebird");
const { Op, where } = require("sequelize");

const {
  Discount,
  ProductCategory,
  ProductInventory,
  Product,
  OrderDetails,
  OrderItems,
  CartItems
} = require("../../db.js");

const getOrderStatus = async (req, res) => {
  const status = req.body
  try {
    const estatus = await OrderDetails.findAll({
      attributes: ['status'], 
    });
    console.log(estatus)
    
    res.status(200).send(estatus);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
};

const filterOrderByStatus = async (req, res) => {
  try {
    const {status}  = req.body;
    console.log(status)
    const allOrders = await OrderDetails.findAll({
      include: {
        model: OrderItems,
        as: 'CartItems'
      }
    });
    console.log(allOrders)
    const map = allOrders.map(e => e.dataValues)
    console.log(map)
    const finalStatus = map.filter(e=> e.status === status)
     finalStatus.length? res.status(200).send(finalStatus) : res.status(404).send('no esta')
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
};

const changeOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const order = await OrderDetails.findByPk(orderId);
    order.set({
     status : status
      
    })
    await order.save();
    res.send(order);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
};

const getInfoProducts = async () => {
  let search = await Product.findAll({
    include: {
      model: ProductCategory,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return search;
};

const getOrders = async (req, res) => {
  try {
    let orders = await OrderDetails.findAll({
      include: {
        model: OrderItems,
        as: 'CartItems'
      }
    });
    res.status(200).send(orders);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
};

const getOrderId = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const orders = await OrderDetails.findAll();
      const orderFiltered = orders.filter((e) => e.id == id);
      res.status(200).send(orderFiltered);
    }
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
};

const getInfoCategory = async () => {
  let search = await ProductCategory.findAll();
  return search;
};

const getCategory = async (req, res) => {
  let search = await getInfoCategory();
  let categories = search.map((x) => ({
    name: x.name,
    description: x.description,
    id: x.id,
  }));

  res.status(200).send(categories);
};

const createCategory = async (req, res) => {
  let { name, description } = req.body;

  let createdCategory = await ProductCategory.create({
    name,
    description,
  });
  res.json(createdCategory);
};

const addCategoryToProduct = async (productid, category) => {
  let categoryDb = await ProductCategory.findOne({
    where: { name: category },
  });
  let product = await Product.findOne({
    where: { id: productid },
  });
  await product.addProductCategory(categoryDb.id);
};

const removeCategoryFromProduct = async (productid, category) => {
  let categoryDb = await ProductCategory.findOne({
    where: { name: category },
  });
  let product = await Product.findOne({
    where: { id: productid },
  });
  await product.removeProductCategory(categoryDb.id);
};

const getAllProducts = async (req, res) => {
  let search = await getInfoProducts();

  let allProducts = [];
  for (let product of search) {
    let inventory = await ProductInventory.findOne({
      where: { id: product.inventory_id },
    });
    allProducts.push({
      id: product.id,
      name: product.name,
      description: product.description,
      SKU: product.SKU,
      price: product.price,
      image: product.image,
      category: product.productCategories.map((x) => x.name),
      quantity: inventory.quantity,
    });
  }

  res.status(200).send(allProducts);
};

const createProduct = async (req, res) => {
  let { name, description, SKU, price, image, category, quantity } = req.body;
  try {
    let createdInventory = await ProductInventory.create({
      quantity,
    });

    let createdProduct = await Product.create({
      name,
      description,
      SKU,
      price,
      image,
      inventory_id: createdInventory.id,
    });

    await Promise.all(category.map( async (item) => {
        await ProductCategory.findOne({
            where: {
            name: item
            }
        }).then(category => {
            createdProduct.addProductCategory(category)
        })
    }));

    return res.status(201).send("Product created");
  } catch (error) {
    console.log(error);
  }
};

const editProduct = async (req, res, next) => {
  const { id, name, image, description, price, SKU, category, quantity } = req.body;
  try {
    const newInventory = await ProductInventory.create({
      quantity,
    });
    const productToUpdate = await Product.findOne({
      where: {
        id: id
      },
      include: {model: ProductCategory}
    })
    productToUpdate.set({
      name: name,
      image: image,
      description: description,
      price: price,
      SKU: SKU,
      inventory_id: newInventory.id
    })
    await productToUpdate.save();
    
    await Promise.all(productToUpdate.productCategories.map(async oldCategory => {
      if(!category.includes(oldCategory)) {
        await removeCategoryFromProduct(id, oldCategory.name)
      }
    }))
    await Promise.all(category.map(async newCategory => {
      if(!productToUpdate.productCategories.includes(newCategory)) {
        await addCategoryToProduct(id, newCategory)
      }
    }))
    const updated = await Product.findOne({
      where: {
        id: id
      },
      include: {model: ProductCategory}
    })    
    return res.send(updated);
  } catch (error) {
    next(error);
  }
};
const allStatus = async (req, res) => {
  const {status} = req.body
  const estatus = await OrderDetails.findAll({
    attributes: ['status'],
    include: {
      model :  OrderItems,
      as: "CartItems",
      attributes: ['product_id'],
    }
  });
  res.send(estatus);
};

const addToInvetory = async (req, res) => {
  let { quantity, id } = req.body;

  let product = await ProductInventory.findOne({
    where: { id: id },
  });

  await product.increment("quantity", { by: quantity });

  res.json({ msg: "increased inventory", product });
};

const removeFromInvetory = async (req, res) => {
  let { quantity, id } = req.body;

  let product = await ProductInventory.findOne({
    where: { id: id },
  });

  await product.decrement("quantity", { by: quantity });

  res.json({ msg: "decreased inventory", product });
};

const createAdmin = async (req, res) => {
  let { id } = req.body;

  User.update(
    {
      isAdmin: true,
    },
    { where: { id: id } }
  );

  let updatedUser = await User.findOne({
    where: { id: id },
  });

  res.json({ updatedUser, msg: "User changed to admin" });
};

const searchProductName = async (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.status(404).send("Invalid name");
  }
  try {
    let productsByName = await Product.findAll({
      where: {
        name: {
          [Op.iLike]: "%" + name + "%",
        },
      },
      include: {
        model: ProductCategory,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    let finalres = [];
    for (let product of productsByName) {
      let inventory = await ProductInventory.findOne({
        where: { id: product.inventory_id },
      });
      finalres.push({
        id: product.id,
        name: product.name,
        description: product.description,
        SKU: product.SKU,
        price: product.price,
        category: product.productCategories.map((x) => x.name),
        quantity: inventory.quantity,
      });
    }
    res.json(finalres);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
};

const searchCategoryName = async function (req, res) {
  const { name } = req.query;
  if (!name) {
    return res.status(404).send("Invalid name");
  }
  try {
    let categoriesByName = await ProductCategory.findAll({
      where: {
        name: {
          [Op.iLike]: "%" + name + "%",
        },
      },
    });
    let finalres = categoriesByName.map((x) => ({
      name: x.name,
      description: x.description,
      id: x.id,
    }));
    res.json(finalres);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
};

const deleteUser = async(req, res) =>{
    let {
        email
    } = req.body

    User.destroy(
        {where: {email: email}}
    )

    res.status(200).send("User deleted")
}

module.exports = {
  searchCategoryName,
  searchProductName,
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
  allStatus,
  filterOrderByStatus,
  changeOrderStatus,
  createAdmin,
  addToInvetory,
  removeFromInvetory,
  allStatus,
  deleteUser
};
