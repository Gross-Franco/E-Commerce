require('dotenv').config()
const axios = require('axios');
const {User, UserAddress, UserPayment, } = require ('../../db.js')

const getUserInfo = async() =>{
    let search = User.findAll({
        include:[UserAddress]
    })
    return search
}
const getUsers = async (req, res) => {
    let search = await getUserInfo()

    res.status(200).send(search)
}


const createUser = async (req, res) => {
    let {
        username,
        password,
        first_name,
        last_name,
        email,
        isAdmin
    } = req.body

    let createdUser = await User.create({
        username,
        password,
        first_name,
        last_name,
        email,
        isAdmin,
        
    },
    )

    res.json({createdUser, msg: 'User created'})
    
}

const addAdress = async(req, res) =>{
    let {
        addressLine1,
        addressLine2,
        city,
        postalCode,
        country,
        telephone,
        mobile,
        userId
    } = req.body

    let createdAddress = await UserAddress.create({
        addressLine1,
        addressLine2,
        city,
        postalCode,
        country,
        telephone,
        mobile,
        userId
    })

    res.json({createdAddress, msg: "added address"})
}

module.exports = {createUser, getUsers, addAdress}