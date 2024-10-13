const Ticket = require("../models/tickets");
const User = require("../models/user");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");

module.exports.getTicketAnalyticsForAdmin = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId);

    if (!user) throw new CustomError.NotFoundError("User not found!");

    const stats = await Ticket.aggregate([
      {
        $facet: {
          statusStats: [
            {
              $group: {
                _id: "$ticketStatus",
                count: { $sum: 1 },
              },
            },
          ],
          priorityStats: [
            {
              $group: {
                _id: "$ticketPriority",
                count: { $sum: 1 },
              },
            },
          ],
          categoryStats: [
            {
              $group: {
                _id: "$ticketCategory",
                count: { $sum: 1 },
              },
            },
          ],
          timeStats: [
            {
              $group: {
                _id: {
                  $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                },
                count: { $sum: 1 },
              },
            },
            { $sort: { _id: 1 } },
          ],
        },
      },
    ]);
    return res.status(StatusCodes.OK).json(stats[0]);
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};
