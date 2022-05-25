const jsonToken = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const jwt = req.header("auth-jsonToken");
  if (!jwt) return res.status(401).send("user cannot access | akses ditolak");

  try {
    const validate = jsonToken.verify(jwt, process.env.key_JWT);
    req.user = validate; //user verified
    next();
  } catch (err) {
    res.status(400).send("invalid token");
  }
};
