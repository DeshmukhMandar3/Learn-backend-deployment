const { userModel } = require("../models/user.models");
const express = require("express");
const { userExists, hashIt } = require("../middlewares/user.middleware");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRouter = express.Router();

userRouter.post("/register", userExists, (req, res) => {
  bcrypt.hash(req.body.password, 5, async (err, hash) => {
    try {
      const data = new userModel({ ...req.body, password: hash });
      await data.save();
      res.send({ msg: "Registration successful!" });
    } catch (err) {
      res.send({ err });
    }
  });
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await userModel.find({ email });
    bcrypt.compare(password, data[0].password, function (err, result) {
      if (result) {
        const token = jwt.sign({ id: data[0]._id }, "secret", {
          expiresIn: "1h",
        });
        res.send({ msg: "Login successful!", token });
      } else {
        res.send({ msg: "Kindly check credentials" });
      }
    });
  } catch (err) {
    res.send({ err });
  }
});

module.exports = { userRouter };
