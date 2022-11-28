const User = require("../model/userModel");
const asyncHanlder = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerUser = asyncHanlder(async (req, res) => {
  res.status(200).json(`message: User registered`);
});
const loginUser = asyncHanlder(async (req, res) => {
  res.status(200).json(`message: Authenticate user`);
});
const getMe = asyncHanlder(async (req, res) => {
  res.status(200).json(`message: Authenticate user`);
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
