const express = require("express");
const router = express.Router();

const {
  authenticateUser,
  authorizeRoles,
} = require("../middleware/authentication");
const {
  getAllTicketsForAdmin,
  findTicketByIdForAdmin,
  changeTicketStatus,
  assignTicket,
} = require("../controllers/ticketController");

router.get(
  "/",
  authenticateUser,
  authorizeRoles("superadmin"),
  getAllTicketsForAdmin
);

router.get(
  "/:id",
  authenticateUser,
  authorizeRoles("superadmin", "admin"),
  findTicketByIdForAdmin
);

router.put(
  "/:id/change-status",
  authenticateUser,
  authorizeRoles("superadmin", "admin"),
  changeTicketStatus
);

router.put(
  "/:id/assign",
  authenticateUser,
  authorizeRoles("superadmin", "user"),
  assignTicket
);

module.exports = router;
