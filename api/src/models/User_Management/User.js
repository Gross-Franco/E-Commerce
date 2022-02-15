const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
    sequelize.define('user', {
    
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
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
    }

});
};