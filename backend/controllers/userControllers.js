const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const Token = require("../model/tokenModel");
const bcrypt = require("bcryptjs");
var parser = require("ua-parser-js");
const { generateToken } = require("../utils/index");
const Cryptr = require("cryptr");

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
  res.cookie("token", token, {
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

//Login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found, please signup");
  }

  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  if (!passwordIsCorrect) {
    res.status(400);
    throw new Error("Invalid email or password");
  }

  // Trigger 2FA for unknown userAgent
  const ua = parser(req.headers["user-agent"]);
  const thisUserAgent = ua.ua;
  console.log(thisUserAgent);
  const allowedAgent = user.userAgent.includes(thisUserAgent);

  if (!allowedAgent) {
    //Generate login code
    const loginCode = Math.floor(100000 + Math.random() * 90000);
    console.log(loginCode);

    //Encrypt loginCode before saving
    const encryptedLoginCode = Cryptr.encrypt(loginCode.toString());

    //Delete Token if it exists in database
    const userToken = await Token.findOne({ userId: user._id });

    if (userToken) {
      await userToken.deleteOne();
    }

    //Save login token in DB
    await new Token({
      userId: user._id,
      lToken: encryptedLoginCode,
      createdAt: Date.now(),
      expiresAt: Date.now() + 60 * (60 * 1000), //60mins
    }).save();

    res.status(400);
    throw new Error("New browser or device detected!");
  }

  //Generate Token
  const token = generateToken(user._id);

  if (user && passwordIsCorrect) {
    //Send httpOnly token
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), //1 day
      sameSite: "none",
      secure: true,
    });

    re.status(201).json({
      name: user.name,
      email: user.email,
      phone: user.phone,
      photo: user.photo,
      bio: user.bio,
      role: user.role,
      isVerified: user.isVerified,
      token,
    });
  } else {
    res.status(500);
    throw new Error("Sorry something went wrong!");
  }
});

module.exports = {
  registerUser,
  loginUser,
};
