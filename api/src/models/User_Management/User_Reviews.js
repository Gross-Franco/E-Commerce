const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
    sequelize.define('userReviews', {

        description:{
            allowNull: true,
            type:DataTypes.STRING(800)
        },

        starsPoints:{
            type:DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0,
                max: 5
            }
        }
    
});
};
