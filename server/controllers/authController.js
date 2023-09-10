const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const { createJsonToken, createReFreshToken } = require("../utils/createToken");

const authCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, password, picture, status } = req.body;
      const newUser = await User.create({
        name,
        email,
        password,
        picture: picture ? picture : process.env.DEFAULT_PICTURE,
        status: status ? status : process.env.DEFAULT_STATUS,
      });
      const token = createJsonToken(
        { id: newUser._id.toString(), email: newUser.email.toString() },
        "13d"
      );
      const refreshToken = createReFreshToken(
        { id: newUser._id.toString(), email: newUser.email.toString() },
        "15d"
      );
      req.session = {
        jwtR: refreshToken,
        jwt: token,
      };
      console.log(req.session);
      const returnedUser = await User.findById(newUser._id).select("-password");
      res.status(201).json({ user: returnedUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  login: async (req, res) => {
    try {
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  logout: async (req, res) => {
    try {
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  refreshToken: async (req, res) => {
    try {
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = authCtrl;
