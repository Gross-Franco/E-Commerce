const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
    sequelize.define('product_inventory', {
    
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    
});
};