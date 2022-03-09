const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
    sequelize.define('userAddress', {
    
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
        type: DataTypes.BIGINT                      ,
    },

    mobile: {
        type: DataTypes.BIGINT                      ,
        allowNull: false,
        unique: true
    }

});
};