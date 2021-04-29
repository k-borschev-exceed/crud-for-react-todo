const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'secrettest', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.send(false)
      } else {
        res.send(true)

        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.send(false)
  }
};

const checkUser = (req, res, next) => {
  console.log('dododo')
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'secrettest', async (err, decodedToken) => {
      if (err) {
        res.send(err)
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.send(user)
        next();
      }
    });
  } else {
    res.send(err);
    next();
  }
};

module.exports = {requireAuth, checkUser};