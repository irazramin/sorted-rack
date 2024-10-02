const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authentication");
const { createTicker } = require("../controllers/ticketController");

router.post("/", authenticateUser, createTicker);

module.exports = router;
