const asynchandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const getMe = asynchandler(async (req, res) => {
  res.status(200).json(req.user);
});

const getUser = asynchandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const updateUser = asynchandler(async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const changePassword = asynchandler(async (req, res) => {
  const { id } = req.user;
  const { password, newPassword } = req.body;

  if (!password || !newPassword) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  try {
    const user = await User.findById(id);

    if (user) {
      const passwordIsCorrect = await bcrypt.compareSync(
        password,
        user.password
      );

      if (passwordIsCorrect) {
        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hashSync(newPassword, salt);

        await User.findByIdAndUpdate(id, { password: hashedPassword });
        res.status(200).json("Password changed successfully");
      } else {
        res.status(400);
        throw new Error("Current Password is incorrect");
      }
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    throw new Error(error);
  }
});

const getUsers = asynchandler(async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const deleteUser = asynchandler(async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

module.exports = {
  getUser,
  getMe,
  updateUser,
  changePassword,
  getUsers,
  deleteUser,
};
