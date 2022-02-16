const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
    sequelize.define('shoppingSession', {
    
    total: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
    
});
};