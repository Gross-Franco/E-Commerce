require("dotenv").config();

const {
  User
} = require("../../db.js");

const createAdmin = async function (req, res) {
  let { id } = req.params;

  User.update(
    {
      isAdmin: true,
    },
    { where: { id: id } }
  );

  res.send("User changed to admin");
};

const deleteUser = async function (req, res) {
    let { id } = req.params;

    User.destroy(
        {where: {id: id}}
    )

    res.status(200).send("User deleted")
}

module.exports = {
  createAdmin,
  deleteUser
};
