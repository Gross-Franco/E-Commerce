const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
    sequelize.define('user', {
    
    addressLine1: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    addressLine2: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    postalCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    country: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    telephone: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    mobile: {
        type: DataTypes.STRING,
        allowNull: false,
    }

});
};