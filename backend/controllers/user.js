const asynchandler = require("express-async-handler");
const User = require("../models/userModel");

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

module.exports = {
  getUser,
  updateUser,
};
