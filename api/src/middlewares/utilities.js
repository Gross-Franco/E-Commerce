require("dotenv").config();
const { ShoppingSession, User } = require("../db");
const jwt = require("jsonwebtoken");
const { FIRM, TOKEN_COOKIE, AUTH_EXPIRES } = process.env;

const createSession = (info = undefined) => {
    let body = {
        ...info,
        // user_id: 1,
    }
    // try {
    //     if (!body.hasOwnProperty('session_id')) {
    //         const session = await ShoppingSession.create();
    //         body = {
    //             ...body,
    //             session_id: session.id,
    //         }
    //     }
    //     if (body.hasOwnProperty('user_id')) {
    //         User.findByPk(body.user_id)
    //             .then(user => {
    //                 user.setSession(body.user_id);
    //             })
    //             .catch(error => console.log(error));
    //     }
    let token = jwt.sign(body, FIRM, { expiresIn: AUTH_EXPIRES })
    // console.log(jwt.decode(token));
    // return { token, permits: body };
    return token;
    // } catch (error) {
    //     console.log(error);
    // }
}

const destroySession = async (id) => {
    try {
        await ShoppingSession.destroy({
            where: {
                id
            },
            truncate: true,
            cascade: true
        })
    } catch (error) {
        return error;
    }
}

const sendVerificationEmail = (token, email, first_name) => {
    //enviar mail 
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
        subject: 'Wellcome EC you need click verificate link',
        //created a link to the client in the message, the route for it is below in forgotpassword token, at the moment the link work on localhost 3000, but to connect to the front the port would need to change
        // <a href="${process.env.CLIENT_URL}/user/resetpassword/${token}">${token}</a>
        html: `<p>CORTESIA DE JOSE:<p>
           
            <p> Hi ${first_name},<p>

            <p> We just need to verify your email address before you can access [customer portal].<p>
            
            <p> Verify your email address :<p>
            <a href="${API}/user/confirm/${token}">${token}</a>
            <p> Thanks! &#8211; The [company] team<p>`
    };


    // this function sends the email using the information for options

    transporter.sendMail(options, function (err, info) {

        if (err) {
            console.log(err)
            return;
        }
        console.log('email sent ' + info.response)
        // res.status(201).json({ message: `Verificate reset request sent to ${email} reset link: ${API}/user/resetpassword/${token}` })
    })
}

const setCookie = (res, name, value, maxAge) => {
    return res.cookie(name, value, { maxAge, httpOnly: true });
}

module.exports = {
    createSession,
    destroySession,
    sendVerificationEmail,
    setCookie
}