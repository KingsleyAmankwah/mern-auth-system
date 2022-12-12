const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const bcrypt = require("bcryptjs");
var parser = require("ua-parser-js");
const { generateToken, hashToken } = require("../utils/index");
const Cryptr = require("cryptr");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

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
      token,
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

    res.status(201).json({
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

//Logout User
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });

  return res.status(200).json({ message: "Logout successful" });
});

//Send verification email
const sendVerificationEmail = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  }

  if (user.isVerified) {
    res.status(400);
    throw new Error("User already verified");
  }

  //Delete Token if it exists in DB
  const token = await Token.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }

  //Create verification token
  const verificationToken = crypto.randomBytes(32).toString("hex") + user._id;
  console.log(verificationToken);

  //Hash token and save
  const hashedToken = hashToken(verificationToken);
  await new Token({
    userId: user._id,
    vToken: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 60 * (60 * 1000), // 60mins
  }).save();

  //Contruct verification url
  const verificationUrl = `${process.env.FRONTEND_URL}/verify/${verificationToken}`;

  // Send Email
  const subject = "Verify Your Account";
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;
  const template = "verifyEmail";
  const name = user.name;
  const link = verificationUrl;

  try {
    await sendEmail(subject, send_to, sent_from, template, name, link);
    res.status(200).json({ message: "Verification Email Sent" });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
});

//Verify User
const verifyUser = asyncHandler(async (req, res) => {
  const { verificationToken } = req.params;

  const hashedToken = hashToken(verificationToken);

  const userToken = await Token.findOne({
    vToken: hashedToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    res.status(404);
    throw new Error("Invalid or Expired Token!");
  }

  //Find User
  const user = await User.findOne({ _id: userToken.userId });

  if (user.isVerified) {
    res.status(400);
    throw new Error("User is already verified");
  }

  // Now verify user
  user.isVerified = true;
  await user.save();

  res.status(200).json({ message: "Account Verification Successful" });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  sendVerificationEmail,
  verifyUser,
};
