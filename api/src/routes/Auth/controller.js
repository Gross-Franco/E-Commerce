require("dotenv").config();
const axios = require('axios');
const { User } = require("../../db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { setCookie, createSession } = require("../../middlewares/utilities.js");
const { TOKEN_COOKIE } = process.env

const signup = async (req, res) => {
    try {
        const { session_id } = req.permits;
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
                // res.cookie(TOKEN_COOKIE, token, { maxAge: 86400000, sameSite: "None", httpOnly: true })
                // sendVerificationEmail(token, user.email, user.first_name);
                return res.status(201).json({ message: 'User created', isUser: true, isAdmin });
            } else {
                return res.status(400).json({ message: 'This email is already registered' })
            }
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

const signin = (req, res, next) => {
    let { email, password } = req.body;
    
    if (!email || !password) return res.status(400).json({ success: false, error: 'Incomplete data form' });
    email = email.toLowerCase();
    User.findOne({
        where: {
            email
        },
        attributes: ["id", "isAdmin", "password"]
    })
        .then((user) => {
            if (bcrypt.compareSync(password, user.password)) {//Los usuarios creados con bulkcreate no estan hasheados
                let token = createSession({ user_id: user.id, isAdmin: user.isAdmin });
                User.findOne({
                    where: {
                        id: user.id
                    }}).then(u => {
                        return res.status(200).json({ success: true, message: "Sign in succesfully", user: u, token });
                    })
            } else {
                // si la contraseña comparada no son validas, reporto un error de validacion de password
                return res.status(401).json({ success: false, message: 'Invalid Password or Email' });
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json(err);
        })
}

const signout = (req, res) => {
    destroySession(session_id)
        .then(() => {
            res.cookie(TOKEN_COOKIE, "", { maxAge: 0, httpOnly: true });
            return res.sendStatus(200);
        })
}

const checkSession = async (req, res) => {
    try {
        if (req.permits) {
            let user = await User.findOne({
                where: {
                    id: req.permits.user_id
                }})
          return res
            .status(200)
            .json({
              message: "Open session",
              isAdmin: req.permits.isAdmin,
              success: true,
              user
            });
        } else {
          let token = createSession();
          setCookie(res, TOKEN_COOKIE, token, 1000 * 60 * 5);
          return res.status(201).json({ message: "session created" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json(error)
    }

}

const githubSession = async (req, res) => {
    const { query } = req;
    const { code } = query;

    if(!code) return res.status(400).json({ success: false, message: 'No code provided' });

    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_SECRET_KEY,
        code: code,
      },
      {
        headers: {
          accept: "application/json",
        },
      }
    );
    return res.status(200).json({ success: true, message: 'Github session created', client: response.data });
}

const thirdpartySignin = async (req, res) => {
    let { first_name, last_name, email, username, id} = req.body;
    if(!first_name || !last_name || !email || !username || !id) return res.status(400).json({ success: false, message: 'Error no auth' });
    email = email.toLowerCase();
    const [user, created] = await User.findOrCreate({
        where: {
            email
        },
        defaults: {
            first_name,
            last_name,
            email,
            username,
            password: id + " " + username,
        }
    })
    if(created) {
        user.dataValues.verified = true;
    }
    const formatedUser = User.findOne({
        where: {
        id: user.id,
        },
    });
    let token = createSession({
        user_id: user.id,
        isAdmin: formatedUser.isAdmin,
    });
    return res
        .status(201)
        .json({
        success: true,
        message: "Successfully signed in",
        isAdmin: false,
        user: formatedUser,
        token,
        });
    
}
module.exports = {
    signup,
    signin,
    signout,
    checkSession,
    githubSession,
    thirdpartySignin
}