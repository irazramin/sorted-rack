const Tickets = require("../models/tickets");

const createTicket = async (data) => {
  try {
    return await Tickets(data).save();
  } catch (error) {
    throw new Error("Ticket creation failed: " + error.message);
  }
};

const getAllTickets = async () => {
  try {
    return await Tickets.find({});
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

module.exports = { createTicket, getAllTickets, findTicketById };
