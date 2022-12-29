const express = require("express");
const {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  changePassword,
} = require("../controllers/user");
const { verifyUser, verifyAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.put("/:id", verifyUser, updateUser);

router.delete("/:id", verifyAdmin, deleteUser);

router.get("/me", verifyUser, getUser);

router.get("/", verifyAdmin, getUsers);

router.patch("/password", changePassword);

module.exports = router;
