const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require("../controllers/auth");

const { authenticateUser } = require("../middleware/authentication");

router.post("/ticket", authenticateUser, registerUser);

module.exports = router;
