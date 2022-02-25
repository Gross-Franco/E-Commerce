const jwt= require('jsonwebtoken')
require('dotenv').config()
const {User} = require('./../../db.js')
const {FIRM} =process.env



module.exports={
	authent:(req,res,next)=>{
		let Token = req.headers['authorization']
		if(Token){
			console.log(Token)
			jwt.verify(Token,FIRM,(err,decode)=>{
				if(decode){
					User.findOne({where:{email:decode.email}})
					.then(resp=>{
						let {username,email,first_name,last_name,isAdmin}=resp
						res.status(200).json({success:true,data:{user:{username,email,first_name,last_name,isAdmin}}})
					},error=>{
						res.status(401).json({success:false,error:'User not found'})
					})
				}
				if(err){
					res.status(400).json({success:false,error:"Token Expired"})
				}
			})
		}else{
			next()
		}
	},
}