const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
    sequelize.define('user_payment', {
    
    paymentType: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    provider: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    accountNo: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    expiry: {
        type: DataTypes.STRING,
        allowNull: false,
    }

});
};