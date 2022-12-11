const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  registerUser,
  sendVerificationEmail,
  loginUser,
  logoutUser,
} = require("../controllers/userControllers");

router.post("/register", registerUser);
router.post("/sendVerificationEmail", protect, sendVerificationEmail);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

module.exports = router;
