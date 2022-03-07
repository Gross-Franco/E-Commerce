require("dotenv").config();
const { Op } = require("sequelize");

const {
  ProductCategory,
  ProductInventory,
  Product,
} = require("../../db.js");

const getAllProducts = async (req, res) => {
    let search = await Product.findAll({
      include: {
        model: ProductCategory
      }
    });
  
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
        inactive: product.inactive,
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
  
      Promise.all(category.map( async (item) => {
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

const editProduct = async (req, res, next) => {
    const { id, name, image, description, price, SKU, category, quantity, inactive } = req.body;
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
        inactive: inactive,
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
          inactive: product.inactive,
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

module.exports = {
    getAllProducts,
    createProduct,
    editProduct,
    searchProductName,
    addToInvetory,
    removeFromInvetory
}