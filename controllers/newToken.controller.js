const { verify, sign } = require('jsonwebtoken');
require('dotenv/config');
const userModel = require('../models/user.model');

const newToken = async (req, res) => {
  // const token = req.cookies.accesstoken;
  const authHeader = req.headers['authorization'];
  const token = authHeader.split(' ')[1];
  //   if we don't have a token in our request
  if (!token) {
    return res.json({ accesstoken: '' });
  }
  //   we have it, lets verify it
  let payload;

  try {
    payload = verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    return res.json({ accesstoken: error.message });
  }

  //   token is vaild, check if user exist
  const user = await userModel.find().where('_id').equals(payload.userId);
  const userId = user[0].id;
  if (!user) {
    return res.json({ accesstoken: '' });
  }
  //   User exist, create new refresh and access token
  user.refreshtoken !== token ?? res.json({ accesstoken: '' });

  //   Token exist, create new refresh and Accesstoken
  const accesstoken = sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });
  res.json({ accesstoken });
};

module.exports = newToken