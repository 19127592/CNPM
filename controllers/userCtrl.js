const Users = require('../models/userModel')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
var check = false
const userCtrl = {
    register: async(req, res) => {
        try {
            const { name, email, password } = req.body;
            const user = await Users.findOne({ email })
            if (user) return res.status(400).json({ msg: "The email already exists." })
            if (password != "") {
                if ((/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/.test(password))) {
                    check = true
                } else {
                    return res.status(400).json({ msg: "Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character:" })
                }
            } else return res.status(400).json({ msg: "Fill the password, please." })
                //Password Encryption
            var hash = crypto.createHash('md5').update(password).digest('hex');
            const newUser = new Users({
                name,
                email,
                password: hash
            })
            if (check) {
                await newUser.save()
            }
            const accesstoken = createAccessToken({ id: newUser._id })
            const refreshtoken = createRefreshToken({ id: newUser._id })
            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token'
            })
            res.json({ accesstoken })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    login: async(req, res) => {
        try {
            const { email, password } = req.body;
            const user = await Users.findOne({ email })
            if (!user) return res.status(400).json({ msg: "User not exist" })
            var hashLogin = crypto.createHash('md5').update(password).digest('hex');
            //const isMatch = await bcrypt.compare(password, user.password)
            if (hashLogin != user.password) return res.status(400).json({ msg: "Incorrect password" })
                //If login success, create access token and refresh token
            const accesstoken = createAccessToken({ id: user._id })
            const refreshtoken = createRefreshToken({ id: user._id })
            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token'
            })
            res.json({ accesstoken })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }

    },
    logout: async(req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: '/user/refresh_token' })
            return res.json({ msg: "Logged out" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    refreshToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken;
            if (!rf_token) return res.status(400).json({ msg: "Please Login or Register" })
            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(400).json({ msg: "Please Login or Register" })
                const accesstoken = createAccessToken({ id: user.id })
                res.json({ accesstoken })
            })
        } catch (err) {

        }
    },
    getUser: async(req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('-password')
            if (!user) return res.status(400).json({ msg: "User does not exist." })
            res.json(user)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}
const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}
const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}
module.exports = userCtrl