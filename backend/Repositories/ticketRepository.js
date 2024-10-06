const Tickets = require("../models/tickets");
const user = require("../models/user");
const mongoose = require("mongoose");
const { convert } = require("html-to-text");

const createTicket = async (data) => {
  try {
    return await Tickets(data).save();
  } catch (error) {
    throw new Error("Ticket creation failed: " + error.message);
  }
};

const getAllTickets = async (query = {}) => {
  try {
    return await Tickets.find(query).populate([
      {
        path: "userId",
        select: "_id username email",
        model: user,
      },
    ]);
  } catch (error) {
    throw new Error("Ticket fetching failed: " + error.message);
  }
};

const findTicketById = async (ticketId) => {
  try {
    const ticketData = await Tickets.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(ticketId),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userId",
        },
      },
      {
        $unwind: "$userId",
      },

      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "ticketId",
          as: "comments",
        },
      },
    ]);

    // console.log();

    return ticketData.length ? ticketData[0] : null;
  } catch (error) {
    throw new Error("Ticket fetching failed: " + error.message);
  }
};

const findTicketByIdAndUpdate = async (ticketId, data) => {
  try {
    return await Tickets.findByIdAndUpdate(ticketId, data, { new: true });
  } catch (error) {
    throw new Error("Ticket fetching failed: " + error.message);
  }
};

const findTicketByIdAndDelete = async (ticketId) => {
  try {
    return await Tickets.findByIdAndDelete(ticketId);
  } catch (error) {
    throw new Error("Ticket deleting failed: " + error.message);
  }
};

module.exports = {
  createTicket,
  getAllTickets,
  findTicketById,
  findTicketByIdAndUpdate,
  findTicketByIdAndDelete,
};
