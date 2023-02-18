const express = require("express");
const { connection } = require("./config/db");
const { todoRouter } = require("./routes/todo.route");
const { userRouter } = require("./routes/user.route");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Server is connected to Database");
  } catch (err) {
    console.log(err);
  }
  console.log("Server has been started at PORT 8080");
});

app.use(express.json());

app.use(cors());

app.use("/user", userRouter);

app.use("/todo", todoRouter);

app.get("/", (req, res) => {
  res.send("Home Page");
});
