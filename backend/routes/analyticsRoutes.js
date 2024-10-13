const express = require("express");
const {
  getTicketAnalyticsForAdmin,
} = require("../controllers/ticketAnalyticController");
const {
  authenticateUser,
  authorizeRoles,
} = require("../middleware/authentication");
const router = express.Router();

router.get(
  "/ticket-stat",
  [authenticateUser, authorizeRoles("superadmin")],
  getTicketAnalyticsForAdmin
);

module.exports = router;
