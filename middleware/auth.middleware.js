const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const requireAuth = (req, res, next) => {
  console.log(req.headers.authorization, 'req headers')
  const token = req.headers.authorization;
  //check json web token exists & is verified
  if (token) {

    jwt.verify(token, 'secrettest', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(401).send('Unathorized')
      } else {
        next();
      }
    });
  } else {
    res.status(401).send('Unathorized')
  }
};

module.exports = {requireAuth};