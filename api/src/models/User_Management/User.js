const { DataTypes, STRING } = require('sequelize');
const bcrypt = require('bcrypt');
// var validator = require('validator');

module.exports = (sequelize) => {
  
    sequelize.define('user', {
    
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: {
                args: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z\d]).{8,}$/gm,
                msg: "The password has to contain at least 1 uppercase letter, 1 lowercase letter, 1 digit and be at least 8 characters total"
            },
        },
        
    },

    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isAlpha: {
                msg: "The first name can only contain letters"
            },
        }
    },

    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlpha: {
                msg: "The last name can only contain letters"
            },
        }
    },
    
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    resetPasswordToken:{
        type: DataTypes.STRING,
        allowNull: true
    },
    resetPasswordExpires: {
        type: DataTypes.DATE,
        allowNull: true
    },
    verificate: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

},{
    timestamps:false,
    hooks:{
        beforeCreate:(user)=>{
            if(user.password){
                user.password = bcrypt.hashSync(user.password, 10)
            }
        },
        beforeUpdate:(user)=>{
            if(user.password){
                user.password= bcrypt.hashSync(user.password,10)
            }
        }
    }});
};

