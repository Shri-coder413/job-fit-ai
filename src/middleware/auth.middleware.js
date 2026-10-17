const jwt = require("jsonwebtoken");
const tokenBlackListModel = require("../models/blacklist.model");

async function authUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Token is not provided",
    });
  }

  const isTokenBlacklisted = await tokenBlackListModel.findOne({ token });

  if (isTokenBlacklisted) {
    return res.status(401).json({
      message: "Invalid token, please login again",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    console.error("Authentication error:", error);

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}

module.exports = { authUser };