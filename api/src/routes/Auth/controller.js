require("dotenv").config();
const { User } = require("../../db.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { AUTH_SECRET, AUTH_EXPIRES } = process.env;
const { ShoppingSession } = require("../../db");

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

                const token = jwt.sign({ user_id: user.id, isAdmin: user.isAdmin}, AUTH_SECRET, { expiresIn: AUTH_EXPIRES });

                return res.status(201).json({ success: true, inf: 'User created', token })

            } else {
                res.status(400).json({ success: false, inf: 'This email is already registered' })
            }
        }
    } catch (error) {
        next(error)
    }
}

const editToken = async (req, res) => {
    const token = jwt.sign(req.edit, AUTH_SECRET, { expiresIn: AUTH_EXPIRES });
    return res
}

const signin = (req,res,next) => {
    const {email , password } = req.body

    !email || !password && res.status(401).json({success:false,error:'Incomplete data form'})

    User.findOne({
        where: {
            email
        },
        atributes: ["id", "isAdmin", "password"],
    }).then((user) => {

        if(bcrypt.compareSync(password, user.password)){    
            // return res.status(200).json({token}
            user.setSession(session_id);
            req.edit = { user_id, isAdmin, session_id };
            next();
        }else{
            // si la contraseña comparada no son validas, reporto un error de validacion de password
            return res.status(400).json({error:'Invalid Password'})
        }
    }).catch(err => {
        // next(err);
    })
}

const shoppingSessionInit = async () => {
		// const { user_id } = req.query;
		try {
			return await ShoppingSession.create();
		} catch (error) {
			console.log(error);
		}
};

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    //? "Bearer TOKEN"
    let token = authHeader && authHeader.split(" ")[1];

    if(!token){
        const session =  await shoppingSessionInit();
        token = jwt.sign({ session_id: session.id }, AUTH_SECRET, { expiresIn: AUTH_EXPIRES })
        // req.token = token
        return res.status(201).json({
            token,
            session_id: session.id
        });
        // next();
    }else{    
        jwt.verify(token, AUTH_SECRET, (err, values) => {
            if (err){ 
                return res.status(403).json([err,values]);
            }
            else{
                // next();
                return res.status(200).json({
                    session_id: values.session_id, 
                    user_id: values.user_id, 
                    isAdmin: values.isAdmin 
                })
            }
        })
    }
}

const deleteShoppingSession =  async () => {
	const { session_id } = req.query;
	let destroyed = {};
	try{
		destroyed.items = await CartItems.destroy({
			where:{
				session_id,
			}
		})
		destroyed.cart = await ShoppingSession.destroy({
			where: {
				id: session_id,
			}
		});
		return res.status(200).json(destroyed);
	}catch(error){
		next(error);
	}
};


module.exports = {
    // signup,
    signin,
    shoppingSessionInit,
    authenticateToken,
    editToken,
}