const express = require("express");
const router = express.Router();
const { protect , adminOnly, authorOnly } = require("../middlewares/authMiddleware");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
  deleteUser,
  getUsers,
  loginStatus,
  sendVerificationEmail,
  verifyUser,
} = require("../controllers/userControllers");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/getUser", protect, getUser);
router.patch("/updateUser", protect, updateUser);


router.delete("/:id", protect, adminOnly, deleteUser);
router.get("/getUsers", protect, authorOnly, getUsers);
router.get("/loginStatus", loginStatus);

router.post("/sendVerificationEmail", protect, sendVerificationEmail);
router.patch("/verifyUser/:verificationToken", verifyUser);

module.exports = router;
