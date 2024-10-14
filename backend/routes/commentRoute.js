const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authentication");
const {
  createComment,
  getTicketById,
} = require("../controllers/commentController");

router.post("/", authenticateUser, createComment);
router.get("/:ticketId", authenticateUser, getTicketById);

module.exports = router;
