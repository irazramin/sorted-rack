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
} = require("../controllers/ticketController");

router.get(
  "/",
  authenticateUser,
  authorizeRoles("superadmin", "admin"),
  getAllTicketsForAdmin
);

router.get(
  "/:id",
  authenticateUser,
  authorizeRoles("superadmin", "admin"),
  findTicketByIdForAdmin
);

router.get(
  "/:id/change-status",
  authenticateUser,
  authorizeRoles("superadmin", "admin"),
  changeTicketStatus
);

module.exports = router;
