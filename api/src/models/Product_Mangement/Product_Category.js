const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
    sequelize.define('product_category', {
    
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: {
        type: DataTypes.TEXT
    }

});
};