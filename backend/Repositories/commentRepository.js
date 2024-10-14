const Comment = require("../models/comment");
const Ticket = require("../models/tickets");
const User = require("../models/user");
const createComment = async (data) => {
  try {
    const res = await Comment(data).save();
    return res;
  } catch (error) {
    throw new Error("Comment creation failed: " + error.message);
  }
};

const getTicketById = async (id) => {
  try {
    const res = await Comment.find({
      ticketId: id,
    }).populate([
      {
        path: "ticketId",
        model: Ticket,
      },
      {
        path: "userId",
        model: User,
      },
    ]);
    return res.reverse();
  } catch (error) {
    throw new Error("Comment creation failed: " + error.message);
  }
};

module.exports = {
  createComment,
  getTicketById,
};
