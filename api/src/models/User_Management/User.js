const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');


module.exports = (sequelize) => {
  
    sequelize.define('user', {
    
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
        // comente esto por el momento ya que al crear el usuario me estaba arrojando que no recibia el password por el body
        // set(value) {
        //     bcrypt.hash(value, 10, function(err, hash) {
        //         this.setDataValues('password', hash)
        //     });
        // }
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    last_name: {
        type: DataTypes.STRING,
        allowNull: false
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
    }

},{
    timestamps:false,
    hooks:{
        beforeCreate:(user)=>{
            if(user.password){
                user.password= bcrypt.hashSync(user.password,10)
            }
        },
        beforeUpdate:(user)=>{
            if(user.password){
                user.password= bcrypt.hashSync(user.password,10)
            }
        }
    }});
};

