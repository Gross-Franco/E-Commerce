const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
    sequelize.define('orderItems', {

    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    
});
};