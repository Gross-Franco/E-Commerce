require("dotenv").config();
const { Op } = require("sequelize");
var nodemailer = require("nodemailer");

const {
  ProductCategory,
  ProductInventory,
  Product,
  User,
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
    let { name, description, SKU, price, image, category, quantity, inactive } = req.body;
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
        inactive,
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
    console.log(inactive)
    try {
      const product = await Product.findOne({
        where: {
          id: id
        },
        include: {model: ProductCategory}
      })
      //we are going to send an email to users that had a product on wishlist that had 0 inventory
      const productInventory = await ProductInventory.findOne({
        where:{
          id: product.inventory_id
        }
      })
      if(productInventory.quantity === 0 && quantity >= 1){

        await productInventory.set({
          quantity: quantity
        })
        productInventory.changed('quantity', true);
        productInventory.save()

        const users = await User.findAll();

        const usersMap = users.map(user => user.dataValues)
        // console.log(usersMap[0])
  
        usersMap.forEach(user => {
        if(user.wishlist){
          // console.log(user)
          var transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: true, // true for 465, false for other ports
            tls: {
              rejectUnauthorized: false,
            },
            auth: {
              user: process.env.MAIL_USER, 
              pass: process.env.MAIL_PASS,
            },
          });
          const options = {
            from: "HENRY e-Commerce <" + process.env.MAIL_USER + ">",
            to: user.email,
            subject: "Your desired item is in stock",
            html: `<h2>Come buy ${product.name}<h2>
                  <p>This email is to let you know we have your desired item in stock<p>
                `,
          };
            // this function sends the email using the information for options
            transporter.sendMail(options, function (err, info) {
              if (err) {
                console.log(err)
                return;
              }
              console.log('email sent ' + info.response)
              // res.json({ message: `sent user wishlist : ${result.receipt_email}` })
            })
            }
      })
      }else {
  
      await productInventory.set({
          quantity: quantity
        })      
        // res.json({ msg: "increased inventory", product });
      }
      productInventory.changed('quantity', true);
      await productInventory.save()

      
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
  
    //we are goin to send an email to user when a product on their whislist gets an incremnet if it was a 0 inventory
    let productat0 = await ProductInventory.findOne({
      where: { id: id, quantity: 0 },
    });
    if(!productat0){

    await productat0.increment("quantity", { by: quantity });

    User.ForEach(user => {
      if(user.wishlist){
        console.log("test", result)
        var transporter = nodemailer.createTransport({
          host: MAIL_HOST,
          port: MAIL_PORT,
          secure: true, // true for 465, false for other ports
          tls: {
            rejectUnauthorized: false,
          },
          auth: {
            user: MAIL_USER, 
            pass: MAIL_PASS,
          },
        });
        const options = {
          from: "HENRY e-Commerce <" + MAIL_USER + ">",
          to: result.receipt_email,
          subject: "Your desired item is in stock",
          html: `<h2>Come buy ${productat0.name}<h2>
                <p>This email is to let you know we have your desired item in stock<p>
              `,
        };
          // this function sends the email using the information for options
          transporter.sendMail(options, function (err, info) {
            if (err) {
              console.log(err)
              return;
            }
            console.log('email sent ' + info.response)
            res.json({ message: `sent user wishlist : ${result.receipt_email}` })
          })
          res.json({ msg: "increased inventory", productat0 });}
    })
    }else {

      let product = await ProductInventory.findOne({
        where: { id: id, quantity: 0 },
      });
      await product.increment("quantity", { by: quantity });
      
      
      
      res.json({ msg: "increased inventory", product });
    }
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