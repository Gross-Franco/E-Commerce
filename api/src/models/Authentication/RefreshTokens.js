const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('refreshTokens', {
        token:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
};