const express = require("express");
const { authentication } = require("../middlewares/todo.middleware");
const { todoModel } = require("../models/todo.models");
const jwt = require("jsonwebtoken");

const todoRouter = express.Router();

todoRouter.get("/", authentication, async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, "secret");
  try {
    const data = await todoModel.find({ user: decoded.id });
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

todoRouter.post("/add", authentication, async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, "secret");

  try {
    const todo = new todoModel({
      ...req.body,
      isCompleted: false,
      user: decoded.id,
    });
    await todo.save();
    res.send("Task added to TodoList");
  } catch (err) {
    res.send(err);
  }
});

todoRouter.patch("/update/:id", authentication, async (req, res) => {
  console.log(req.body);
  console.log(req.params.id);
  try {
    await todoModel.findByIdAndUpdate({ _id: req.params.id }, req.body);
    res.send("Updated task in database");
  } catch (err) {
    res.send(err);
  }
});

todoRouter.delete("/delete/:id", authentication, async (req, res) => {
  try {
    await todoModel.findByIdAndDelete({ _id: req.params.id }, req.body);
    res.send("Deleted task from database");
  } catch (err) {
    res.send(err);
  }
});

module.exports = { todoRouter };
