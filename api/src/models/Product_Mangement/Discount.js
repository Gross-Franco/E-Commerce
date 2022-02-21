const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
    sequelize.define('discount', {
    
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: {
        type: DataTypes.TEXT
    },

    discount_percent: {
        type: DataTypes.DECIMAL,
        validate: {
            min: 0,
            max: 100
        }
    },

    active: {
        type: DataTypes.BOOLEAN
    }

});
};