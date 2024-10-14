const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");
const commentService = require("../services/commentService");
module.exports.createComment = async (req, res) => {
  try {
    const { userId } = req.user;
    const { ticketId, comment } = req.body;

    const user = await User.findById(userId);
    if (!user) throw new CustomError.NotFoundError("User not found!");

    const response = await commentService.createComment({
      ticketId,
      userId,
      comment,
    });

    return res.status(StatusCodes.OK).json({ data: response });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

module.exports.getTicketById = async (req, res) => {
  try {
    const { userId } = req.user;
    const { ticketId } = req.params;

    const user = await User.findById(userId);
    if (!user) throw new CustomError.NotFoundError("User not found!");

    const response = await commentService.getTicketById(ticketId);

    return res.status(StatusCodes.OK).json({ data: response });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};
