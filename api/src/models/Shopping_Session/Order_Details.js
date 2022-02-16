const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
    sequelize.define('orderDetails', {
    
    total: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
    
});
};