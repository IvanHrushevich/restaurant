const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const keys = require('../config/keys');
const errorHandler = require('../utils/errorHandler');

module.exports.login = async (req, res) => {
  const userInDb = await User.findOne({ email: req.body.email });

  if (userInDb) {
    const passwordResult = bcrypt.compareSync(req.body.password, userInDb.password);

    if (passwordResult) {
      const token = jwt.sign(
        {
          email: userInDb.email,
          userId: userInDb._id,
        },
        keys.JWT,
        { expiresIn: 60 * 60 }
      );

      res.status(200).json({ token: `Bearer ${token}` });
    } else {
      res.status(401).json({
        message: 'Passwords do not match. Try again.',
      });
    }
  } else {
    res.status(404).json({
      message: 'User was not found',
    });
  }
};

module.exports.register = async (req, res) => {
  const userInDb = await User.findOne({ email: req.body.email });

  if (userInDb) {
    res.status(400).json({ message: 'This email already exists. Try another one.' });
  } else {
    const salt = bcrypt.genSaltSync(10);

    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, salt),
    });

    try {
      await user.save();
      res.status(201).json(user);
    } catch (err) {
      errorHandler(err);
    }
  }
};
