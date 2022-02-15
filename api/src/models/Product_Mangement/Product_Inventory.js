const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
    sequelize.define('productInventory', {
    
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    
});
};