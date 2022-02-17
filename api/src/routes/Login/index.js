const {postLogin} = require('./controller')
const Login = require('express').Router()

Login.post('/login',postLogin)


module.exports=Login