const {DataTypes,Model}=require('sequelize');

class Review extends Model{}


module.exports= sequelize=> Review.init({
    id:{
        primaryKey:true,
        allowNull:false,
        type:DataTypes.INTEGER,
        autoIncrement:true
    },
    description:{
        allowNull:true,
        type:DataTypes.STRING(800)
    },
    starsPoin:{
        type:DataTypes.INTEGER,
        allowNull:true
    }
},{
    sequelize:sequelize,
    modelName:'Reviews',
    timestamps:true
})