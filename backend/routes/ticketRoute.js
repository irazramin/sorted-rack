const express = require("express");
const router = express.Router();

const {
  authenticateUser,
  authorizeRoles,
} = require("../middleware/authentication");
const {
  createTicker,
  getAllTickets,
  findTicketById,
  findTicketByIdAndUpdate,
  findTicketByIdAndDelete,
  getAllTicketsForAdmin,
  getAssignedTickets,
  getTicketCount,
} = require("../controllers/ticketController");

router.post("/", authenticateUser, createTicker);
router.get("/", authenticateUser, getAllTickets);
router.get("/get-ticket-count", authenticateUser, getTicketCount);

router.get(
  "/assigned-tickets",
  [authenticateUser, authorizeRoles("admin", "superadmin")],
  getAssignedTickets
);

router.get("/:id", authenticateUser, findTicketById);
router.put("/:id", authenticateUser, findTicketByIdAndUpdate);

router.delete("/:id", authenticateUser, findTicketByIdAndDelete);

module.exports = router;
