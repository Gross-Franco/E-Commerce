require('dotenv').config()

const {User, UserAddress, UserPayment, Product, Review, OrderDetails} = require ('../../db.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const {FIRM} =process.env 

const getUserInfo = async () => {
	let search = User.findAll({
		include: [UserAddress],
	});
	return search;
};
const getUsers = async (req, res, next) => {
	try {
		let search = await getUserInfo();

		return res.status(200).send(search);
	} catch (error) {
		next(error);
	}
};

const addAdress = async (req, res, next) => {
	let { addressLine1, addressLine2, city, postalCode, country, telephone, mobile, userId } = req.body;

	try {
		let createdAddress = await UserAddress.create({
			addressLine1,
			addressLine2,
			city,
			postalCode,
			country,
			telephone,
			mobile,
			userId,
		});
		return res.status(201).json({ createdAddress, msg: "added address" });
	} catch (error) {
		next(error);
	}
};

const addPayment = async(req, res) =>{
    let {
        paymentType,
        provider,
        accountNo,
        expiry,
        userId
    } = req.body

    let createdPayment = await UserPayment.create({
        paymentType,
        provider,
        accountNo,
        expiry,
        userId
    })

    res.json({createdPayment, msg: "added payment option"})
}

const createUser = async (req, res) => {
    try {
        let {
            username,
            password,
            first_name,
            last_name,
            email,
            isAdmin
        } = req.body
        if (!username || !first_name || !last_name || !email) {
            res.status(400).json({ success: false, error: 'fields are missing in the form' })
        } else {
            let [user, created] = await User.findOrCreate({ where: { email: email }, defaults: { username, password, first_name, last_name, email, isAdmin } })
            if (created) {
                res.status(201).json({ success: true, inf: 'User created' })
            } else {
                res.status(400).json({ success: false, inf: 'This email is already registered' })
            }
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed in the process to register: ' + error })
    }
}

const postLogin = (req,res) => {
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
    } catch(e){
        res.status(500).json({success:false,error:e})
    }
}

const postReviewProduct = async (req,res)=>{
    // si se envia el token
    //let {id}=jwt.decode(req.headers['authorization'].split(' ')[1])
    // de lo contrario se envia el id del usuario de forma manual
    //let {userID}= req.query
    // per es necesario un identificador para buscar el usuario en la base de datos
    // o si se usar cookie-session 
    // let {usAuth}= req.session
    // let {id} = jwt.decode(usAuth)
    try{
        let {idProduct} =req.params
        if(req.body){
            if(req.body.hasOneProperty('description')&& typeof req.body['description']!== 'string'){
                throw Error('Data types error ')
            }
            if(req.body.hasOneProperty('starsPoint')&& typeof req.body['starsPoint']!== 'number'){
                throw Error('Data types error ')
            }
        }
        let product=await Product.findOne({where:{id:idProduct}})
        !product&& new Error('Product no found')
        let review= await Review.create(req.body)
        // dara un error si no hay una id de un usuario
        User.findOne({where:{id:id}})
            .then((result) => {
                review.addUser(result)
                product.setReview(review)
                res.status(201).json({success:true,inf:'Review add to Product'})
            },(error)=>{
                res.status(400).json({success:false,inf:'user nof found: '+error})
            })
            
            
        }catch(e){
            res.status(400).json({success:false,inf:e})
        }
    }
    
    const OrdersUser = async (req, res) => {
        const {first_name, last_name} = req.body;
        try {
            const Myorders = await User.findAll({
                include: {
                    model: OrderDetails,
                    as: "PurchaseOrder",

                }
            })
           
            if(first_name && last_name) {
              const map = Myorders.map(e => e.dataValues)
              const myOrder = map.filter(e=> e.first_name.toLowerCase() === first_name.toLowerCase() && 
                e.last_name.toLowerCase() === last_name.toLowerCase());
              res.status(200).send(myOrder) 
            }
        } catch (error) {
            console.log(error);
            res.status(404).send(error)
        }
    }



module.exports = {
    getUsers, 
    addAdress, 
    postReviewProduct,
    createUser,
    postLogin,
    addPayment,
    OrdersUser
}
