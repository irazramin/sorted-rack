const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authentication");
const {
  createTicker,
  getAllTickets,
} = require("../controllers/ticketController");

router.post("/", authenticateUser, createTicker);
router.get("/", authenticateUser, getAllTickets);

module.exports = router;
