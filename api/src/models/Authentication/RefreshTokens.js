const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
    sequelize.define('refreshToken', {
        token:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
};