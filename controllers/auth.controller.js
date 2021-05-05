const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id, email) => {
  return jwt.sign({ id, email }, 'secrettest', {
    expiresIn: maxAge,
  });
};

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id, user.email);

    res.status(200).send({ userId: user._id, email: user.email, token });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).send({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id, user.email);

    res.status(200).send({ token });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).send({ errors });
  }
};

module.exports.verify_token = (req, res) => {
  const { token } = req.body;
  try {
    jwt.verify(token, 'secrettest', () => {
      res.status(200).send({ status: true });
    });
  } catch (err) {
    res.status(400).send({ status: false });
  }
};
