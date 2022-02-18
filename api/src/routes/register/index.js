const createUser =require('./controller')
const Register= require('express').Router()

Register.post('/register',createUser)


module.exports=Register
