const User = require("../models/User");

module.exports.login = (req, res) => {
  res.status(200).json({
    login: true,
  });
};

module.exports.register = async (req, res) => {
  const userInDb = await User.findOne({ email: req.body.email });

  if (userInDb) {
    res
      .status(400)
      .json({ message: "This email already exists. Try another one." });
  } else {
    //
  }
};
