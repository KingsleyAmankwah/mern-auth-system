const express = require("express");
const router = express.Router();
const {
  protect,
  adminOnly,
  authorOnly,
} = require("../middlewares/authMiddleware");
const {
  getUser,
  updateUser,
  deleteUser,
  getUsers,
} = require("../controllers/user");

router.get("/getUser", protect, getUser);
router.patch("/updateUser", protect, updateUser);
router.delete("/:id", protect, adminOnly, deleteUser);
router.get("/getUsers", protect, authorOnly, getUsers);

module.exports = router;
