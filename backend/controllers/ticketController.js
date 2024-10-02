const StatusCodes = require("http-status-codes");
const User = require("../models/user");
const Ticket = require("../models/tickets");
const ticketService = require("../services/ticketService");

module.exports.createTicker = async (req, res) => {
  try {
    const { userId } = req.user;
    const {
      ticketName,
      ticketCategory,
      ticketStatus,
      ticketPriority,
      ticketDetails,
    } = req.body;

    const user = await User.findById(userId);
    if (!user) throw new CustomError.NotFoundError("User not found!");

    const response = await ticketService.createTicket({
      ticketName,
      ticketCategory,
      ticketStatus,
      ticketPriority,
      ticketDetails,
      userId,
    });

    return res.status(StatusCodes.OK).json({ data: response });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

module.exports.getAllTickets = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId);

    if (!user) throw new CustomError.NotFoundError("User not found!");

    const response = await ticketService.getAllTickets();

    return res.status(StatusCodes.OK).json({ data: response });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};
