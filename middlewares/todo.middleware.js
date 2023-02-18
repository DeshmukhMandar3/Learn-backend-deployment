const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, "secret", function (err, decoded) {
    if (decoded) {
      next();
    } else {
      res.send("session timeout, Kindly Login");
    }
  });
};

module.exports = { authentication };
