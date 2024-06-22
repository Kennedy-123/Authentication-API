const logout = async (req, res) => {
  res.status(200).json({ msg: 'Logged Out' });
};

module.exports = logout;
