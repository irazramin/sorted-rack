const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authentication");
const { createComment } = require("../controllers/commentController");

router.post("/", authenticateUser, createComment);

module.exports = router;
