const express = require("express");
const {
  register,
  login,
  logout,
  getRefreshToken,
} = require("../controllers/auth");

const router = express.Router();

router.post("/", register);
router.get("/", logout);
router.post("/login", login);
router.get("/refresh", getRefreshToken);

module.exports = router;
