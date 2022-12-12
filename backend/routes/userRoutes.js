const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  sendVerificationEmail,
  verifyUser,
} = require("../controllers/userControllers");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/getUser", getUser);

router.post("/sendVerificationEmail", protect, sendVerificationEmail);
router.patch("/verifyUser/:verificationToken", verifyUser);

module.exports = router;
