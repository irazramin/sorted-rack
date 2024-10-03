const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authentication");
const {
  createTicker,
  getAllTickets,
  findTicketById,
  findTicketByIdAndUpdate,
  findTicketByIdAndDelete,
} = require("../controllers/ticketController");

router.post("/", authenticateUser, createTicker);
router.get("/", authenticateUser, getAllTickets);
router.get("/:id", authenticateUser, findTicketById);
router.put("/:id", authenticateUser, findTicketByIdAndUpdate);
router.delete("/:id", authenticateUser, findTicketByIdAndDelete);

module.exports = router;
