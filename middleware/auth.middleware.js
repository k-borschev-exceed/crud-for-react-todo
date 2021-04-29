const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log('step first')
  if (token) {
    console.log('step second')

    jwt.verify(token, 'secrettest', (err, decodedToken) => {
      console.log('step third')

      if (err) {
        console.log(err.message);
        console.log('error step')

        //res.status(400).send(false)
      } else {
        //res.send(true)
        console.log('step fourth')

        //console.log(decodedToken);
        next();
      }
    });
  } else {
    console.log('else step')
    //res.status(400).send(false)
  }
};

const checkUser = (req, res, next) => {
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
    res.send(JSON.stringify({ text : 'user doesnt exist'}));
    next();
  }
};

module.exports = {requireAuth, checkUser};