const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const user = await User.findOne({ _id: decodedToken.id, email: decodedToken.email });

    if (!user) {
      throw new Error();
    }

    req.user = { id: String(user._id) };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Non authentifié' });
  }
};

module.exports = auth;
