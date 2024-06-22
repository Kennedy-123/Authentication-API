require('dotenv/config');
const { hash } = require('bcryptjs');
const userModel = require('../models/user.model');

//   register controller

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    // check if user exist
    const user = await userModel.find().where('email').equals(email);
    if (user.length > 0) throw new Error('user already exist');

    // if not user exist, hash the password
    const hashPassword = await hash(password, 10);

    // insert in the database
    const registeredUser = await userModel.create({
      email: email,
      password: hashPassword,
    });

    res.status(200).json({ msg: 'User registered', registeredUser });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = register;
