const asynchandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { GenerateToken } = require("../utils/token");

const register = asynchandler(async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      throw new Error("User already exists!");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const login = asynchandler(async (req, res) => {
  try {
    const { email, secret } = req.body;
    if (!email || !secret) {
      res.status(400);
      throw new Error("Please add all fields");
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404);
      throw new Error("User not found!");
    }

    const passwordIsCorrect = await bcrypt.compare(
      req.body.secret,
      user.password
    );

    if (!passwordIsCorrect) {
      res.status(400);
      throw new Error("Invalid email or password");
    }

    //Generate Token
    const { access_token, refresh_token } = GenerateToken(user);

    //Update token in user
    const updateUser = await User.findByIdAndUpdate(
      user._id,
      { token: refresh_token },
      { new: true }
    );

    //Add refresh token to cookie
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Fetch user data without token and password
    const { password, token, ...userData } = updateUser._doc;

    //Add access Token to user data
    userData.access_token = access_token;

    res.status(200).json({ details: { ...userData } });
  } catch (error) {
    throw new Error(error);
  }
});

const logout = asynchandler(async (req, res) => {
  const refresh_token = req.cookies?.refresh_token;
  console.log(refresh_token);

  try {
    const user = await User.findOne({ token: refresh_token });

    if (!user) {
      res.status(404);
      throw new Error("User not found!");
    }

    await User.findByIdAndUpdate({ token: null });
    res.clearCookie("refresh_token");
    res.status(200).json("Logged out successfully");
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  register,
  login,
  logout,
};
