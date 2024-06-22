require('dotenv/config');
const { sign } = require('jsonwebtoken');
const { compare } = require('bcryptjs');
const userModel = require('../models/user.model');

// login controller

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // check for user in database
    const user = await userModel.find().where('email').equals(email);
    if (!user.length > 0) throw new Error('user does not exist');
    // compare crypted password
    const userPassword = user[0].password;
    const valid = compare(password, userPassword);
    if (!valid) throw new Error('password not correct');
    // create Refresh and accessToken
    const userId = user[0].id;
    const accesstoken = sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '15m',
    });

    // put the refreshtoken in the database
    user[0].accesstoken = accesstoken;

    // send response

    res.status(200).json({ token: accesstoken, email: req.body.email });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = login;
