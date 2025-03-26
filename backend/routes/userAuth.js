const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Malformed Authorization header. Token required." });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authentication Token Required" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired. Please sign in again." });
      }
      console.error("JWT Verification Error:", err.message);
      return res.status(403).json({ message: "Invalid token. Please sign in again." });
    }
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };