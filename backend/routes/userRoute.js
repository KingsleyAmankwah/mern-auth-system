const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { getUser } = require("../controllers/user");

router.get("/getUser", protect, getUser);

module.exports = router;
