const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
    sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image:{
        type:DataTypes.STRING,
        allowNull:true
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