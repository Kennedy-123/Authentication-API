const { verify } = require('jsonwebtoken');

const protected = async (req, res) => {
  try {
    const authorization = req.header('authorization');
    if (!authorization) throw new Error('you need to login');
    const token = authorization.split(' ')[1];
    const userId = verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (userId !== null) {
      res.status(200).json({ msg: 'This is protected data' });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = protected;
