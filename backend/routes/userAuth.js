const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer split

  if (token == null) {
    return res.status(401).json({ message: "Authentication Token Required" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log(token);
      return res.status(403).json({ message: "Token expired. Please sign in again" });
    }
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };