require("dotenv").config();

const {
  User
} = require("../../db.js");

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

module.exports = {
  createAdmin,
};
