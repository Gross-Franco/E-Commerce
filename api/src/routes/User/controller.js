require("dotenv").config();

const {
  User,
  UserAddress,
  UserPayment,
  Product,
  UserReviews,
  OrderDetails,
  OrderItems,
  PaymentDetails,
} = require("../../db.js");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { FIRM, MAIL_HOST, MAIL_USER, MAIL_PASS, MAIL_PORT } = process.env;
var nodemailer = require("nodemailer");
var crypto = require("crypto");
var xoauth2 = require("xoauth2");

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
  let {
    addressLine1,
    addressLine2,
    city,
    postalCode,
    country,
    telephone,
    mobile,
    user_id,
  } = req.body;

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
  let { paymentType, provider, accountNo, expiry, user_id } = req.body;

  let createdPayment = await UserPayment.create({
    paymentType,
    provider,
    accountNo,
    expiry,
    user_id,
  });

  res.json({ createdPayment, msg: "added payment option" });
};

const createUser = async (req, res) => {


  let {
    first_name,
    last_name,
    email,
    password,
    // verificatePassword,
    paymentMethod,
    username,
    address,
    phoneNumber,
    postalNumber } = req.body;
  // res.send( {first_name,
  //   last_name,
  //   email,
  //   password,     
  //   paymentMethod, 
  //   username,
  //   address,
  //   phoneNumber,
  //   postalNumber});
  try {
    email = email.toLowerCase();
    let createdUser = await User.create({
      first_name,
      last_name,
      email,
      password,
      paymentMethod,
      username,
      address,
      phoneNumber,
      postalNumber
    });
    // res.send(createdUser)

    // res.send(createdUser)
    if (createdUser) {
      //generar token
      const userForToken = {
        username,
        email,
        userId: createdUser.dataValues.id,
        isAdmin: false,
      };

      let token = jwt.sign(userForToken, FIRM, { expiresIn: "1d" });


      // set up nodemailer configs
      var transporter = nodemailer.createTransport({
        host: MAIL_HOST,
        port: MAIL_PORT,
        secure: true, // use SSL
        tls: {
          rejectUnauthorized: false,
        },
        auth: {
          user: MAIL_USER, //email created to send the emails from
          pass: MAIL_PASS,
        },
      });

      const options = {
        from: "'HENRY e-COMMERCE' <" + MAIL_USER + ">",
        to: email,
        subject: "Welcome to Henry Commerce, Confirm your sign up",
        //created a link to the client in the message, the route for it is below in forgotpassword token, at the moment the link work on localhost 3000, but to connect to the front the port would need to change
        // <a href="${process.env.CLIENT_URL}/user/resetpassword/${token}">${token}</a>
        html: `
            <p> Hi ${first_name},</p>
        
            <h1>Thanks for signing up!  </h1>

            <p> To get started, please confirm your email address by clicking the link below. If you didn't do this, ignore this message</p>
            
            <a href="https://pghenry.herokuapp.com/user/confirm/${token}">Verify your account!</a>
            <p> Thanks! &#8211;  The HCommerce team</p>`,
      };

      // this function sends the email using the information for options
      transporter.sendMail(options, function (err, info) {
        if (err) {
          console.log(err);
          return;
        }
        console.log("email sent " + info.response);
      });

      return res.status(201).json({
        success: true,
        message: "Account created succesfully, please confirm your email!",
      });
    }
  } catch (error) {
    return res.status(422).json({ success: false, message: "Something wrong happened" });
  }
};

const confirm = async (req, res) => {
  try {
    // Obtener el token
    const { token } = req.params;

    // Verificar la data
    let data = null;

    jwt.verify(token, FIRM, (err, decoded) => {
      if (err) {
        console.log("Error al obtener data del token");
      } else {
        data = decoded;
      }
    });

    // console.log()

    if (data === null) {
      return res.json({
        success: false,
        msg: "Error al obtener data",
      });
    }

    console.log(data);

    const { username, email, userId } = data;

    // Verificar existencia del usuario
    const user = await User.findOne({ where: { email: email } }) || null;

    if (user === null) {
      return res.json({
        success: false,
        msg: "Usuario no existe",
      });
    }

    // Verificar el c??digo
    //  if(code !== user.code) {
    //       return res.redirect('/error.html');
    //  }

    // Actualizar usuario
    //  user.set('verificate', true);
    user.verified = true;
    await user.save();

    // Redireccionar a la confirmaci??n
    return res.status(202).redirect("https://pg-henry-grupo6.vercel.app/verification/" + username + "?token=" + token);
  } catch (error) {
    console.log(error);
    // window.location.href = `/verificate/No_Verficate`;
    return res.json({
      success: false,
      msg: "Error al confirmar usuario",
    });
  }
};

const postLogin = (req, res) => {
  try {
    const { email, password } = req.body;

    !email ||
      (!password &&
        res
          .status(400)
          .json({ success: false, message: "Incomplete data form" }));

    User.findOne({
      attributes: ["password", "id", "isAdmin", "username"],
      where: { email: email }
    })
      .then((result) => {
        // si existe el usuario registrado comparo la contrase??a tipeada con la que esta en la base de datos
        const verify = bcrypt.compareSync(password, result.password);
        console.log('Verify: ', verify)
        if (verify) {
          // si la contrase??a es correcta
          // extraigo los datos necesarios para el front-end y el token
          // y devuelvo el token y datos necesarios del usuario
          let { id, isAdmin, username } = result;
          let Token = jwt.sign(
            { id, isAdmin },
            FIRM,
            { expiresIn: "5d" }
          );
          return res.status(200).json({
            success: true,
            message: "Login succesfully",
            data: {
              Token,
              user: { username, id, isAdmin },
            },
          });
        } else {
          // si la contrase??a comparada no son validas, reporto un error de validacion de password
          return res.status(401).json({ success: false, message: "Invalid Email or Password" });
        }
      })
      .catch((err) => {
        // en caso de que el usuario no exista
        console.log(err);
        return res
          .status(403)
          .json({ success: false, message: "Type an email " });
      });
  } catch (e) {
    return res.status(500).json({ success: false, message: e });
  }
};

const postReviewProduct = async (req, res) => {
  const { product_id, description, starsPoints, user_id } = req.body;
  
  try {

    let product = await Product.findOne({ where: { id: product_id } });
    if(!product) throw Error("Product not found");

    let user = await User.findOne({ where: { id: user_id } });
    if(!user) throw Error("User not found");
      
    await UserReviews.create({
      description,
      starsPoints,
      user_id,
      product_id, 
    });

    res.status(201).json({ success: true, inf: "Review added to Product" });
  
  } catch (e) {
    console.log(e)
    res.status(400).json({ success: false, inf: e });
  }
};



const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(req.body);
    //set token for password recovery
    let token = crypto.randomBytes(20).toString("hex");
    // console.log(token)
    //search for user with email address on database
    const user = await User.findOne({
      where: { email: email },
    });
    //if no user is found send error message
    if (!user) {
      res.json({ message: "no account witht that email" });
    }
    //creates a token and an expiration date for the password reset
    user.set({
      resetPasswordToken: token,
      resetPasswordExpires: Date.now() + 3600000, // 1 hour
    });
    await user.save();
    // console.log(user)
    // set up nodemailer configs
    var transporter = nodemailer.createTransport({
      host: MAIL_HOST,
      port: MAIL_PORT,
      secure: true, // true for 465, false for other ports
      tls: {
        rejectUnauthorized: false,
      },
      auth: {
        user: MAIL_USER, //email created to send the emails from
        pass: MAIL_PASS,
      },
    });
    const options = {
      from: "HENRY e-Commerce <" + MAIL_USER + ">",
      to: email,
      subject: "Password Reset for the ecommerce platform",
      //created a link to the client in the message, the route for it is below in forgotpassword token, at the moment the link work on localhost 3000, but to connect to the front the port would need to change
      // <a href="${process.env.CLIENT_URL}/user/resetpassword/${token}">${token}</a>
      html: `<p>Password reset request:<p>
            <p>You are receiving this because you (or someone else) have requested the reset of the password for your account.<p>
            <p>Please click on the following link, or paste this into your browser to complete the process:<p>
            <a href="https://pghenry.herokuapp.com/user/resetpassword/${token}">${token}</a>
            <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
          `,
    };
    // this function sends the email using the information for options
    transporter.sendMail(options, function (err, info) {
      if (err) {
        console.log(err);
        return;
      }
      console.log("email sent " + info.response);
      res.json({
        message: `password reset request sent to ${email} reset link: https://pg-henry-grupo6.vercel.app/user/resetpassword/${token}`,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "error" });
  }
};


const getUserDetails = async (req, res ) => {
  // const { user_id } = req.permits;   // Real 
  const { userid } = req.params;       // Testing
  try {

    const user = await User.findByPk(Number(userid));

    res.json(user)
  } catch (err) {
    console.log(err)
  }
}

const getUserAddresses = async (req, res ) => {
  // const { user_id } = req.permits;   // Real 
  const { userid } = req.params;       // Testing
  try {
    const addresses = await UserAddress.findAll({where: {user_id: userid}})
    res.json(addresses)
  } catch (err) {
    console.log(err)
  }
}

const getUserPayments = async (req, res ) => {
  // const { user_id } = req.permits;   // Real 
  const { userid } = req.params;       // Testing
  try {
    const payments = await UserPayment.findAll({where: {user_id: userid}})
    res.json(payments)
  } catch (err) {
    console.log(err)
  }
}

const passwordResetToken = async (req, res) => {
  try {
    // Get the token from params
    const token = req.params.token;
    const { newPassword } = req.body;
    console.log(newPassword);
    //we search of there is an user with a valid password token and if it has not expired
    const user = await User.findOne({ where: { resetPasswordToken: token } });
    //if there isnt any we send error message
    let now = new Date();
    //we check if the token hasnt expired
    if (!user.resetPasswordExpires - now > 0) {
      console.log(!user.resetPasswordExpires - now > 0);
      res.json({
        message: "password reset request expired, or user not found",
      });
    }
    //set new password and set tokens to null, so that password cant be changed again with the same link
    user.set({
      password: newPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    });
    //we save the change in the database
    user.save();
    // console.log(user)
    //same email code as before
    var transporter = nodemailer.createTransport({
      host: MAIL_HOST,
      port: MAIL_PORT,
      secure: true, // true for 465, false for other ports
      tls: {
        rejectUnauthorized: false,
      },
      auth: {
        user: MAIL_USER, //email created to send the emails from
        pass: MAIL_PASS,
      },
    });
    const options = {
      from: "HENRY e-Commerce <" + MAIL_USER + ">",
      to: user.email,
      subject: "your password has been changed",
      html: `<h2>Password reset<h2>
            <p>This is a confirmation that the password for your account ${user.email} has been changed .<p>
          `,
    };
    // this function sends the email using the information for options
    transporter.sendMail(options, function (err, info) {
      if (err) {
        console.log(err);
        return;
      }
      console.log("email sent " + info.response);
      res.json({
        message: `password for email: ${user.email} has been changed`,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "error" });
  }
};

const validate = async (req, res) => {
  const { email, username } = req.query;
  if (email) {
    const exists = await User.findOne({ where: { email: email } })
    if (exists) return res.send(true);
    else return res.send(false)
  }
  if (username) {
    const exists = await User.findOne({ where: { username: username } })
    if (exists) return res.send(true);
    else return res.send(false)
  }
  res.send('error: invalid query')
}

const orderHistory = async (req, res) => {
  const { userid } = req.params;


  try {
    let userOrders = await OrderDetails.findAll({
      where: {user_id: userid},
      include: { model: OrderItems, },     
    });
    const response = await Promise.all(userOrders.map(async order => {
      let payment = {}
      if (order.payment_id) payment = await PaymentDetails.findOne({where: {id: order.payment_id}})
      return {
        id: order.id,
        total: order.total,
        status: order.status,
        createdAt: order.createdAt,
        payment: {
          amount: payment.amount,
          provider: payment.provider,
          status: payment.status
        },
        orderItems: await Promise.all(order.orderItems.map(async item => {
          let product = await Product.findByPk(item.product_id)
          return {product: product.name, quantity: item.quantity, image: product.image, SKU: product.SKU, price: product.price}
        })),
      }
    })) 
    res.status(200).send(response);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }

};

const userReviews = async (req, res) => {
  
  const {userid} = req.params;
  try {
    let reviews = await UserReviews.findAll({
      where: {user_id: userid}
    });
  let reviewsProduct = await Promise.all(reviews.map(async e => {
    let productoRW = {};
    if(e.product_id) productoRW = await Product.findOne({where: {id:e.product_id}})
    return {
      id : e.id,
      description: e.description,
      user_id: e.user_id,
      product_id: e.product_id,
      productoRW: {
        name: productoRW.name,
        image: productoRW.image
      }
    }
  }))
    res.json(reviewsProduct)
    
  } catch(err) {
    console.log(err)
  }

}

module.exports = {
  getUsers,
  getUserDetails,
  getUserAddresses,
  getUserPayments,
  orderHistory,
  userReviews,
  addAdress,
  postReviewProduct,

  createUser,
  postLogin,
  addPayment,
  forgotPassword,
  passwordResetToken,
  confirm,
  validate,
  // addToWhishlist
};
