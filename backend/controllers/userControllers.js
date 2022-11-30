const User = require("../model/userModel");
const asyncHanlder = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// @desc    Register a new user
// @route   /api/users/
// @access  Public
const registerUser = asyncHanlder(async (req, res) => {
  const { name, email, password } = req.body;

  //validate user input
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //Check if user Exist
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create new user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  }

  // res.status(200).json(`message: User registered`);
});

// @desc    Authenticate user
// @route   /api/users/login
// @access  Public
const loginUser = asyncHanlder(async (req, res) => {
  const { email, password } = req.body;

  //validate user input
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //Check if user exists
  const user = await User.findOne({ email });

  //check user and password match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  // res.status(200).json(`message: Authenticate user`);
});

// @desc    Get current user
// @route   /api/users/me
// @access  Private
const getMe = asyncHanlder(async (req, res) => {
  res.status(200).json(req.user);
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
