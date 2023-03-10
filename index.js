const express = require("express");
const { connection } = require("./config/db");
const { todoRouter } = require("./routes/todo.route");
const { userRouter } = require("./routes/user.route");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/user", userRouter);

app.use("/todo", todoRouter);

app.get("/", (req, res) => {
  res.send("Home Page");
});

async function connectUser() {
  try {
    await connection;
    console.log("Server is connected to Database");
  } catch (err) {
    console.log(err);
  }
}

connectUser();
app.listen(process.env.port, () => {
  console.log("Server has been started at PORT 8080");
});
