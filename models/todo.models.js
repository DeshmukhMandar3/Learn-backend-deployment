const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  task: { type: String, require: true },
  isCompleted: { type: Boolean, require: true },
  user: { type: String, require: true },
});

const todoModel = mongoose.model("todo", todoSchema);

module.exports = { todoModel };
