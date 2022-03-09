require("dotenv").config();
const { Op } = require("sequelize");

const {
  ProductCategory,
} = require("../../db.js");
  
const getCategory = async (req, res) => {
    let search = await ProductCategory.findAll();
    let categories = search.map((x) => ({
      name: x.name,
      description: x.description,
      id: x.id,
      image: x.image,
    }));
  
    res.status(200).send(categories);
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
        image: x.image,
      }));
      res.json(finalres);
    } catch (err) {
      console.log(err);
      res.status(404).send(err);
    }
};

const createCategory = async (req, res) => {
    let { name, description, image } = req.body;
  
    let createdCategory = await ProductCategory.create({
      name,
      description,
      image,
    });
  
    res.json(createdCategory);
};

module.exports = {
    getCategory,
    searchCategoryName,
    createCategory,
}
