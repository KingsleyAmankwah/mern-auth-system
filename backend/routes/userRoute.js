const express = require("express");
const {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  changePassword,
  getMe,
} = require("../controllers/user");
const { verifyUser, verifyAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.put("/:id", verifyUser, updateUser);

router.delete("/:id", verifyAdmin, deleteUser);

router.get("/:id", verifyUser, getUser);

router.get("/me", verifyUser, getMe);

router.get("/", verifyAdmin, getUsers);

router.patch("/password", verifyUser, changePassword);

module.exports = router;
