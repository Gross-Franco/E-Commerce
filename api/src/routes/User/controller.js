require('dotenv').config()

const { User, UserAddress, UserPayment, Product, Review, OrderDetails } = require('../../db.js')

// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken')
// const {AUTH_SECRET, AUTH_ROUND, AUTH_EXPIRES} =process.env
var nodemailer = require('nodemailer');
var crypto = require('crypto');
// var xoauth2 = require('xoauth2');


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
  let { addressLine1, addressLine2, city, postalCode, country, telephone, mobile, user_id } = req.body;

  try {
    let createdAddress = await UserAddress.create({
      addressLine1,
      addressLine2,
      city,
      postalCode,
      country,
      telephone,
      mobile,
      user_id,
    });

    return res.status(201).json({ createdAddress, msg: "added address" });
  } catch (error) {
    next(error);
  }
};

const addPayment = async (req, res) => {
  const { user_id } = req.permits;

  let {
    paymentType,
    provider,
    accountNo,
    expiry,
  } = req.body

  let createdPayment = await UserPayment.create({
    paymentType,
    provider,
    accountNo,
    expiry,
  })

  createdPayment.setUser(user_id);

  res.json({ createdPayment, msg: "added payment option" })
}

// const createUser = async (req, res, next) => {
//   try {
//     const { session_id } = req.permits;
//     const {
//       username,
//       password,
//       first_name,
//       last_name,
//       email,
//       isAdmin
//     } = req.body

//     if (!username || !first_name || !last_name || !email) {
//       return res.status(400).json({ success: false, error: 'fields are missing in the form' })
//     } else {

//       let [user, created] = await User.findOrCreate({
//         where: { email },
//         defaults: { username, password, first_name, last_name, email, isAdmin }
//       })

//       if (created) {

//         const { token } = createSession({ session_id, user_id: user.id, isAdmin: user.isAdmin })
//         res.cookie(TOKEN_COOKIE, token, { maxAge: 86400000, sameSite: "None", httpOnly: true, secure: true })//Para usar en localhost sacar el secure y el sameSite

//         // sendVerificationEmail(token, user.email, user.first_name);

//         return res.status(201).json({ message: 'User created', isUser: true, isAdmin });

//       } else {
//         res.status(400).json({ message: 'This email is already registered' })
//       }
//     }
//   } catch (error) {
//     return res.status(500).json(error)
//   }
// }

const postReviewProduct = async (req, res) => {
  // si se envia el token
  //let {id}=jwt.decode(req.headers['authorization'].split(' ')[1])
  // de lo contrario se envia el id del usuario de forma manual
  //let {userID}= req.query
  // per es necesario un identificador para buscar el usuario en la base de datos
  // o si se usar cookie-session 
  // let {usAuth}= req.session
  // let {id} = jwt.decode(usAuth)
  try {
    let { idProduct } = req.params
    if (req.body) {
      if (req.body.hasOneProperty('description') && typeof req.body['description'] !== 'string') {
        throw Error('Data types error ')
      }
      if (req.body.hasOneProperty('starsPoint') && typeof req.body['starsPoint'] !== 'number') {
        throw Error('Data types error ')
      }

const confirm = async (req, res) => {
  try {

     // Obtener el token
     const { token } = req.cookies;
     
     // Verificar la data
     let data =  null;

     jwt.verify(token, FIRM, (err, decoded) => {
         if(err) {
             console.log('Error al obtener data del token');
         } 
         else {
             data = decoded;
         }
     });
 
  // console.log()

     if(data === null) {
          return res.json({
              success: false,
              msg: 'Error al obtener data'
          });
     }

     console.log(data);

     const {username,email} = data;

     // Verificar existencia del usuario
     //
    //  const user = await User.findOne({ email }) || null;

     const user = await User.findOne({
      where: {email: email}
    }) || null;

     if(user === null) {
          return res.json({
              success: false,
              msg: 'Usuario no existe'
          });
     }

     // Verificar el código
    //  if(code !== user.code) {
    //       return res.redirect('/error.html');
    //  }

     // Actualizar usuario
    //  user.set('verificate', true);
     user.verificate = true;
     await user.save();



     // Redireccionar a la confirmación
  res.redirect('http://localhost:3000/verificate/'+ username)

      
  } catch (error) {
      console.log(error);
      // window.location.href = `/verificate/No_Verficate`;
      return res.json({
          success: false,
          msg: 'Error al confirmar usuario'
      });
  }
}


// const postLogin = (req,res) => {
//   const {}
//   try{
//     let product = await Product.findOne({ where: { id: idProduct } })
//     !product && new Error('Product no found')
//     let review = await Review.create(req.body)
//     // dara un error si no hay una id de un usuario
//     User.findOne({ where: { id: id } })
//       .then((result) => {
//         review.addUser(result)
//         product.setReview(review)
//         res.status(201).json({ success: true, inf: 'Review added to Product' })
//       }, (error) => {
//         res.status(400).json({ success: false, inf: 'user not found: ' + error })
//       })


//   } catch (e) {
//     res.status(400).json({ success: false, inf: e })
//   }
// }

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
  const { user_id } = req.permits;
  try {

    const myOrders = await User.findAll({
      where: {
        user_id
      },
      include: {
        model: OrderDetails,
        as: "PurchaseOrder",

      }
    })

    // if (first_name && last_name) {
    //   const map = Myorders.map(e => e.dataValues)
    //   const myOrder = map.filter(e => e.first_name.toLowerCase() === first_name.toLowerCase() &&
    //     e.last_name.toLowerCase() === last_name.toLowerCase());
    res.status(200).send(myOrders)

  } catch (error) {
    console.log(error);
    res.status(500).send(error)
  }
}

const forgotPassword = async (req, res) => {

  try {
    const { email } = req.body;
    console.log(req.body);
    //set token for password recovery
    let token = crypto.randomBytes(20).toString('hex')
    // console.log(token)
    //search for user with email address on database
    const user = await User.findOne({
      where: { email: email }
    })
    //if no user is found send error message
    if (!user) {
      res.json({ message: "no account with that email" })
    }
    //creates a token and an expiration date for the password reset
    user.set({
      resetPasswordToken: token,
      resetPasswordExpires: Date.now() + 3600000 // 1 hour
    })
    await user.save();
    // console.log(user)
    // set up nodemailer configs
    var transporter = nodemailer.createTransport({
      service: "Outlook365",
      host: "smtp.office365.com",
      port: "587",
      tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
      },
      auth: {
        user: 'ecommerce53@outlook.com', //email created to send the emails from
        pass: 'ecommerce777*'
      },
    });
    const options = {
      from: 'ecommerce53@outlook.com',
      to: email,
      subject: 'Password Reset for the ecommerce platform',
      //created a link to the client in the message, the route for it is below in forgotpassword token, at the moment the link work on localhost 3000, but to connect to the front the port would need to change
      // <a href="${process.env.CLIENT_URL}/user/resetpassword/${token}">${token}</a>
      html: `<p>CORTESIA DE JOSE:<p>
            <p>You are receiving this because you (or someone else) have requested the reset of the password for your account.<p>
            <p>Please click on the following link, or paste this into your browser to complete the process:<p>
            <a href="http://localhost:3000/user/resetpassword/${token}">${token}</a>
            <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
          `
    };
    // this function sends the email using the information for options
    transporter.sendMail(options, function (err, info) {
      if (err) {
        console.log(err)
        return;
      }
      console.log('email sent ' + info.response)
      res.json({ message: `password reset request sent to ${email} reset link: http://localhost:3001/user/resetpassword/${token}` })
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: "error" })
  }

}

const passwordResetToken = async (req, res) => {
  try {
    // Get the token from params
    const token = req.params.token;
    const { newPassword } = req.body;
    console.log(newPassword)
    //we search of there is an user with a valid password token and if it has not expired
    const user = await User.findOne({ where: { resetPasswordToken: token } })
    //if there isnt any we send error message
    let now = new Date()
    //we check if the token hasnt expired
    if (!user.resetPasswordExpires - now > 0) {
      console.log(!user.resetPasswordExpires - now > 0)
      res.json({ message: "password reset request expired, or user not found" })
    }
    //set new password and set tokens to null, so that password cant be changed again with the same link
    user.set({
      password: newPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null
    })
    //we save the change in the database
    user.save()
    // console.log(user)
    //same email code as before
    var transporter = nodemailer.createTransport({
      service: "Outlook365",
      host: "smtp.office365.com",
      port: "587",
      tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
      },
      auth: {
        user: 'ecommerce53@outlook.com', //email created to send the emails from
        pass: 'ecommerce777*'
      },
    });
    const options = {
      from: 'ecommerce53@outlook.com',
      to: user.email,
      subject: 'your password has been changed',
      html: `<h2>Password reset<h2>
            <p>This is a confirmation that the password for your account ${user.email} has been changed .<p>
          `
    };
    // this function sends the email using the information for options
    transporter.sendMail(options, function (err, info) {
      if (err) {
        console.log(err)
        return;
      }
      console.log('email sent ' + info.response)
      res.json({ message: `password for email: ${user.email} has been changed` })
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: "error" })
  }

}


module.exports = {
  getUsers,
  OrdersUser,
  addAdress,
  postReviewProduct,
  createUser,
  // postLogin,
  addPayment,
  forgotPassword,
  passwordResetToken,
  OrdersUser
}