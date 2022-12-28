const express = require("express");
const { register, login, logout } = require("../controllers/auth");

const router = express.Router();

router.post("/", register);
router.post("/login", login);
router.get("/", logout);

module.exports = router;
