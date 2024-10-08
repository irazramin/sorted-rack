const ticketRepository = require("../Repositories/ticketRepository");

const createTicket = async (body) => {
  try {
    const data = await ticketRepository.createTicket(body);
    return data;
  } catch (error) {
    throw new Error("Ticket creating failed: " + error.message);
  }
};

const getAllTickets = async (query = {}) => {
  try {
    const data = await ticketRepository.getAllTickets(query);
    return data;
  } catch (error) {
    throw new Error("Ticket fetching failed: " + error.message);
  }
};

const getAllTicketsForAdmin = async (query = {}) => {
  try {
    const data = await ticketRepository.getAllTicketsForAdmin(query);
    return data;
  } catch (error) {
    throw new Error("Ticket fetching failed: " + error.message);
  }
};

const findTicketById = async (id) => {
  try {
    const data = await ticketRepository.findTicketById(id);
    return data;
  } catch (error) {
    throw new Error("Ticket fetching failed: " + error.message);
  }
};

const findTicketByIdAndUpdate = async (id, data) => {
  try {
    const result = await ticketRepository.findTicketByIdAndUpdate(id, data);
    return result;
  } catch (error) {
    throw new Error("Ticket updating failed: " + error.message);
  }
};

const findTicketByIdAndDelete = async (id) => {
  try {
    const result = await ticketRepository.findTicketByIdAndDelete(id);
    return result;
  } catch (error) {
    throw new Error("Ticket deleting failed: " + error.message);
  }
};

const changeTicketStatus = async (id, status) => {
  try {
    const result = await ticketRepository.changeTicketStatus(id, status);
    return result;
  } catch (error) {
    throw new Error("Ticket updating failed: " + error.message);
  }
};

module.exports = {
  createTicket,
  getAllTickets,
  findTicketById,
  findTicketByIdAndUpdate,
  findTicketByIdAndDelete,
  getAllTicketsForAdmin,
  changeTicketStatus,
};
