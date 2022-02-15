const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
    sequelize.define('product', {
    
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: {
        type: DataTypes.TEXT
    },

    SKU: {
        type: DataTypes.STRING,
        allowNull: false
    },

    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
    
});
};