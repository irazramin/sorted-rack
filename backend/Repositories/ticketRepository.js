const Tickets = require("../models/tickets");
const user = require("../models/user");

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
        select: "_id name email",
        model: user,
      },
    ]);
  } catch (error) {
    throw new Error("Ticket fetching failed: " + error.message);
  }
};

const findTicketById = async (ticketId) => {
  try {
    return await Tickets.findById(ticketId);
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
