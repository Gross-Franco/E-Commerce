const jwt= require('jsonwebtoken')
const bcrypt= require('bcrypt')
const {User}= require('../../db')
require('dotenv').config()
const {FIRM}= process.env


module.exports={
    postLogin:(req,res)=>{
        try{
        const {email,password}= req.body
        !email||!password&& res.status(401).json({success:false,error:'Incomplete data form'})
        User.findOne({where:{email:email}})
        .then((result) => {
            // si existe el usuario registrado comparo la contraseña tipeada con la que esta en la base de datos
            const verify= bcrypt.compareSync(password,result.password)
            if(verify){
                // si la contraseña es correcta 
                // extraigo los datos necesarios para el front-end y el token
                // y devuelvo el token y datos necesarios del usuario
                let {
                    username,
                    email,
                    first_name,
                    last_name,
                    isAdmin
                }=result
                let Token= jwt.sign({username,email,first_name,last_name,isAdmin},FIRM,{expiresIn:'5d'})
                res.status(200).json({success:true,data:{Token,user:{username,email,first_name,last_name,isAdmin}}})
            }else{
                // si la contraseña comparada no son validas, reporto un error de validacion de password
                res.status(400).json({success:false,error:'Invalid Password'})
            }
        }).catch((err) => {
            // en caso de que el usuario no exista
            res.status(401).json({success:false,error:'User not found: '+ err})    
        });
    }catch(e){
        res.status(500).json({success:false,error:e})
    }
    }
}