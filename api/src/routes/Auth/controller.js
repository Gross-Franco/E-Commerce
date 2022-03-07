require("dotenv").config();
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
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ success: false, error: 'Incomplete data form' });

    User.findOne({
        where: {
            email
        },
        attributes: ["id", "isAdmin", "password"]
    })
        .then((user) => {
            if (bcrypt.compareSync(password, user.password)) {//Los usuarios creados con bulkcreate no estan hasheados
                let token = createSession({ user_id: user.id, isAdmin: user.isAdmin });
                setCookie(res, TOKEN_COOKIE, token, 1000 * 60 * 5);
                return res.status(200).json({ message: "Ususario logeado correctamente", user });
            } else {
                // si la contraseña comparada no son validas, reporto un error de validacion de password
                return res.status(401).json({ msg: 'Invalid Password or Email' });
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
        console.log(req.permits);
        if (req.permits) return res.status(200).json({ message: "open session" });
        else {
            let token = await createSession();
            setCookie(res, TOKEN_COOKIE, token, 60000)
            return res.status(201).json({ message: "session created" })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json(error)
    }

}

module.exports = {
    signup,
    signin,
    signout,
    checkSession
}