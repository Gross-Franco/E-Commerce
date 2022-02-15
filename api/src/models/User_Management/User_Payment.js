const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
    sequelize.define('userPayment', {  
    
    paymentType: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    provider: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    accountNo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    expiry: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    }

});
};