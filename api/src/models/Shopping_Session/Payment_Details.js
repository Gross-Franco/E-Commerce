const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
    sequelize.define('paymentDetails', {  
    id:{
        primaryKey:true,
        allowNull:false,
        type:DataTypes.INTEGER,
        autoIncrement:true
    },
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