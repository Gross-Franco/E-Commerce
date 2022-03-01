require("dotenv").config();

const {
  User,
  UserAddress,
  UserPayment,
  Product,
  Review,
  OrderDetails,
} = require("../../db.js");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { FIRM } = process.env;
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
  let { username, password, first_name, last_name, email } = req.body;

  if (!username || !first_name || !last_name || !email || !password) {
    res
      .status(400)
      .json({ success: false, message: "Fields are missing in the form" });
  } else {
    let [user, created]= await User.findOrCreate({
      where: { email: email, username: username },
      defaults: { username, password, first_name, last_name, email },
    });
    if(!created) {
      res.status(400).json({ success: false, message: "Email already exists" });
    } else {
      //generar token 
      const userForToken = {
        username,
        email,
        userId: user.dataValues.id,
      }
      let token = jwt.sign(userForToken, FIRM, { expiresIn: "1d" });
      //enviar mail
      // set up nodemailer configs
      var transporter = nodemailer.createTransport({
        host: "smtp.hostinger.com",
        port: 465,
        secure: true, // use SSL
        tls: {
          rejectUnauthorized: false,
        },
        auth: {
          user: "welcome@hcommerce.store", //email created to send the emails from
          pass: "1-Nunca-pares-de-aprender-!",
        },
      });

      const options = {
        from: "'HENRY e-COMMERCE' <welcome@hcommerce.store>",
        to: email,
        subject: "Welcome to EC, Confirm your sign up",
        //created a link to the client in the message, the route for it is below in forgotpassword token, at the moment the link work on localhost 3000, but to connect to the front the port would need to change
        // <a href="${process.env.CLIENT_URL}/user/resetpassword/${token}">${token}</a>
        html: `<h1>CORTESIA DE JOSE:</h1>
           
            <p> Hi ${first_name},</p>

            <p> We just need to verify your email address before you can access [customer portal].</p>
            
            <p> Verify your email address :</p>
            <a href="http://localhost:3001/user/confirm/${token}">Verify your account!</a>
            <p> Thanks! &#8211; The [company] team</p>`,
      };

      // this function sends the email using the information for options
      transporter.sendMail(options, function (err, info) {
        if (err) {
          console.log('un poco antes')
          console.log(err);
          return;
        }
        console.log("email sent " + info.response);
        res.status(201).json({
          message: `Verificate reset request sent to ${email} reset link: http://localhost:3001/user/resetpassword/${token}`,
        });
      });
      //--------------------------------------I--------------------------------------

      res
        .status(201)
        .json({
          success: true,
          message: "account created succesfully, please confirm your email!",
        });
    } 
  }
/*   try {
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed in the process to register: " + error,
    });
  } */
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
    //
    //  const user = await User.findOne({ email }) || null;

    const user =
      (await User.findOne({
        where: { email: email },
      })) || null;

    if (user === null) {
      return res.json({
        success: false,
        msg: "Usuario no existe",
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
    res.redirect("http://localhost:3000/verificate/" + username);
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
          .status(401)
          .json({ success: false, error: "Incomplete data form" }));

    User.findOne({ where: { email: email } })
      .then((result) => {
        // si existe el usuario registrado comparo la contraseña tipeada con la que esta en la base de datos
        const verify = bcrypt.compareSync(password, result.password);
        if (verify) {
          // si la contraseña es correcta
          // extraigo los datos necesarios para el front-end y el token
          // y devuelvo el token y datos necesarios del usuario
          let { username, email, first_name, last_name, isAdmin } = result;
          let Token = jwt.sign(
            { username, email, first_name, last_name, isAdmin },
            FIRM,
            { expiresIn: "5d" }
          );
          res.status(200).json({
            success: true,
            data: {
              Token,
              user: { username, email, first_name, last_name, isAdmin },
            },
          });
        } else {
          // si la contraseña comparada no son validas, reporto un error de validacion de password
          res.status(400).json({ success: false, error: "Invalid Password" });
        }
      })
      .catch((err) => {
        // en caso de que el usuario no exista
        res
          .status(401)
          .json({ success: false, error: "User not found: " + err });
      });
  } catch (e) {
    res.status(500).json({ success: false, error: e });
  }
};

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
    let { idProduct } = req.params;
    if (req.body) {
      if (
        req.body.hasOneProperty("description") &&
        typeof req.body["description"] !== "string"
      ) {
        throw Error("Data types error ");
      }
      if (
        req.body.hasOneProperty("starsPoint") &&
        typeof req.body["starsPoint"] !== "number"
      ) {
        throw Error("Data types error ");
      }
    }
    let product = await Product.findOne({ where: { id: idProduct } });
    !product && new Error("Product no found");
    let review = await Review.create(req.body);
    // dara un error si no hay una id de un usuario
    User.findOne({ where: { id: id } }).then(
      (result) => {
        review.addUser(result);
        product.setReview(review);
        res.status(201).json({ success: true, inf: "Review add to Product" });
      },
      (error) => {
        res
          .status(400)
          .json({ success: false, inf: "user nof found: " + error });
      }
    );
  } catch (e) {
    res.status(400).json({ success: false, inf: e });
  }
};

const OrdersUser = async (req, res) => {
  const { first_name, last_name } = req.body;
  try {
    const Myorders = await User.findAll({
      include: {
        model: OrderDetails,
        as: "PurchaseOrder",
      },
    });

    if (first_name && last_name) {
      const map = Myorders.map((e) => e.dataValues);
      const myOrder = map.filter(
        (e) =>
          e.first_name.toLowerCase() === first_name.toLowerCase() &&
          e.last_name.toLowerCase() === last_name.toLowerCase()
      );
      res.status(200).send(myOrder);
    }
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
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
      host: "smtp.hostinger.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      tls: {
        rejectUnauthorized: false,
      },
      auth: {
        user: "support@hcommerce.store", //email created to send the emails from
        pass: "1-Nunca-pares-de-aprender-!",
      },
    });
    const options = {
      from: "HENRY e-Commerce <support@hcommerce.com>",
      to: email,
      subject: "Password Reset for the ecommerce platform",
      //created a link to the client in the message, the route for it is below in forgotpassword token, at the moment the link work on localhost 3000, but to connect to the front the port would need to change
      // <a href="${process.env.CLIENT_URL}/user/resetpassword/${token}">${token}</a>
      html: `<p>CORTESIA DE JOSE:<p>
            <p>You are receiving this because you (or someone else) have requested the reset of the password for your account.<p>
            <p>Please click on the following link, or paste this into your browser to complete the process:<p>
            <a href="http://localhost:3000/user/resetpassword/${token}">${token}</a>
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
        message: `password reset request sent to ${email} reset link: http://localhost:3001/user/resetpassword/${token}`,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "error" });
  }
};

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
      host: "smtp.hostinger.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      tls: {
        rejectUnauthorized: false,
      },
      auth: {
        user: "support@hcommerce.com", //email created to send the emails from
        pass: "1-Nunca-pares-de-aprender-!",
      },
    });
    const options = {
      from: "HENRY e-Commerce <support@hcommerce.com>",
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

module.exports = {
  getUsers,
  OrdersUser,
  addAdress,
  postReviewProduct,
  createUser,
  postLogin,
  addPayment,
  forgotPassword,
  passwordResetToken,
  confirm,
};
