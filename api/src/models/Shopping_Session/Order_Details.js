const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
    sequelize.define('orderDetails', {
    
    total: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },

    status: {
        type: DataTypes.ENUM('Created', 'Processing', 'Cancelled', 'Completed'),
        allowNull: false
    }
    
});
};