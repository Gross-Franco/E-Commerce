require("dotenv").config();
const { User } = require("../../db.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { AUTH_SECRET, AUTH_EXPIRES } = process.env;

const signup = async (req, res, next) => {
    try {
        const {
            username,
            password,
            first_name,
            last_name,
            email,
            isAdmin
        } = req.body

        if (!username || !first_name || !last_name || !email) {
            return res.status(400).json({ success: false, error: 'fields are missing in the form' })
        } else {

            let [user, created] = await User.findOrCreate({ 
              where: { email }, 
              defaults: { username, password, first_name, last_name, email, isAdmin } 
            })

            if (created) {

                const token = jwt.sign({ user_id: user.id, isAdmin: user.isAdmin}, AUTH_SECRET, {
                    expiresIn: AUTH_EXPIRES,
                });

                return res.status(201).json({ success: true, inf: 'User created', token })

            } else {
                res.status(400).json({ success: false, inf: 'This email is already registered' })
            }
        }
    } catch (error) {
        next(error)
    }
}

const signin = (req,res, next) => {

    const {email , password } = req.body

    !email || !password && res.status(401).json({success:false,error:'Incomplete data form'})

    User.findOne({
        where: {
            email
        },
        atributes: ["id", "isAdmin", "password"],
    }).then((user) => {

        if(bcrypt.compareSync(password, user.password)){
                
            const token = jwt.sign({ user_id: user.id, isAdmin: user.isAdmin }, AUTH_SECRET, { expiresIn: AUTH_EXPIRES })

            return res.status(200).json({token})
        }else{
                // si la contraseña comparada no son validas, reporto un error de validacion de password
            return res.status(400).json({error:'Invalid Password'})
        }
    }).catch(err => {
        next(err);
    })
}


module.exports = {
    signup,
    signin,
}