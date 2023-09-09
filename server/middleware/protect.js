const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

exports.protect = async (req, res, next) => {
    try {
        const token = req.session.jwtR
        //console.log(req.session)
        if (!token) {
            return res.status(400).json({ message: "You should sign in!" })
        }
        //base64.decode(token).split()
        const { id } = jwt.verify(token, `${process.env.JWT_ACCESS_KEY}`)
        if (!id) {
            return res.status(401).json({ message: "Invalid credentials!" });
        }
        const user = await User.findOne({ _id: id })
        if (!user) {
            return res.status(403).json({ message: "No authorization!" });
        }
        req.user = user
        next()
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}