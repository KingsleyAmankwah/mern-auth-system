const jwt = require("jsonwebtoken");
const asyncHanlder = require("express-async-handler");
const User = require("../model/userModel");

const protect = asyncHanlder(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Get token from headers
      token = req.headers.authorization.split("  ")[1];

      //Verify token
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);

      //Get user from token
      req.user = await User.findById(decoded.id).select("-password");
    } catch (error) {
      console.log(error);

      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
