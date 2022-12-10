const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
var parser = require("ua-parser-js");
const { generateToken } = require("../utils/index");

//Register User
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields.");
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("Email already in use.");
  }

  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters");
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const ua = parser(req.headers["user-agent"]);
  const userAgent = [ua.ua];

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    userAgent,
  });

  //Generate token
  const token = generateToken(user._id);

  //Send Http-only token
  req.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), //1 day
    sameSite: "none",
    secure: true,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      photo: user.photo,
      bio: user.bio,
      role: user.role,
      isVerified: user.isVerified,
      token: user.token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data!");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  res.status(200).json(`Authenticate user`);
});

module.exports = {
  registerUser,
};
