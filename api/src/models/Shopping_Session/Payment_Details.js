const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
    sequelize.define('paymentDetails', {  
        
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    provider: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    status: {
        type: DataTypes.STRING,
        allowNull: false,
    }

});
};