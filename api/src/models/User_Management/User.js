const { DataTypes, STRING } = require("sequelize");
const bcrypt = require("bcrypt");
var validator = require("validator");

module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
        },
        set(value) {
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(value, salt);
          this.setDataValue("password", hash);
          // To check password load hash from your password DB.
          // bcrypt.compareSync(correctpassword, hash); // true
          // bcrypt.compareSync(wrongPassword, hash); // false
        },
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      verificate: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      resetPasswordToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      resetPasswordExpires: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      wishlist:{
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
      },
    },
    {
      timestamps: false,
      hooks: {
        beforeCreate: (user) => {
          if (user.password) {
            user.password = bcrypt.hashSync(user.password, 10);
          }
        },
        beforeUpdate: (user) => {
          if (user.password) {
            user.password = bcrypt.hashSync(user.password, 10);
          }
        },
      },
      defaultScope: {
        attributes: { exclude: ["password"] },
      },
      scopes: {
        withPassword: {
          attributes: {},
        },
      },
    }
  );
};
