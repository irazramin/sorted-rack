const StatusCodes = require("http-status-codes");
const User = require("../models/user");
const Ticket = require("../models/tickets");

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

    const response = await Ticket({
      ticketName,
      ticketCategory,
      ticketStatus,
      ticketPriority,
      ticketDetails,
    }).save();

    return res.status(StatusCodes.OK).json({ data: response });
  } catch (error) {
    return;
  }
};
