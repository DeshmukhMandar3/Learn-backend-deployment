const { userModel } = require("../models/user.models");

const userExists = async (req, res, next) => {
  const email = req.body.email;
  const data = await userModel.find({ email });
  if (data.length > 0) {
    res.send("User already Exists!, Kindly Login");
  } else {
    next();
  }
};

module.exports = { userExists };
