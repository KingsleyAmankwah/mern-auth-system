const express = require("express");
const { updateUser, getUser, changePassword } = require("../controllers/user");

const router = express.Router();

router.put("/:id", updateUser);
router.get("/:id", getUser);
router.patch("/password", changePassword);

module.exports = router;
