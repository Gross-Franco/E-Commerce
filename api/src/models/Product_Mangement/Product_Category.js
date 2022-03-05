const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
    sequelize.define('productCategory', {
    
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    description: {
        type: DataTypes.TEXT
    },
    
    image: {
        type: DataTypes.STRING
    }
});
};