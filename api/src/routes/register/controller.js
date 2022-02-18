const { User } = require('../../db')

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
        if (!username || !password || !first_name || !last_name || !email) {
            res.status(400).json({ success: false, error: 'fields are missing in the form' })
        } else {
            let [user, created] = await User.findOrCreate({ where: { email: email }, defaults: {username,password, first_name, last_name, email, isAdmin } })
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
module.exports =createUser