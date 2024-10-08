const ticketRepository = require("../Repositories/ticketRepository");
const Comments = require("../models/comment");
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
    let data = await ticketRepository.getAllTickets(query);

    data = await Promise.all(
      data?.map(async (ticket) => {
        const commentsDocuments = await Comments.countDocuments({
          ticketId: ticket?._id,
        });
        const plainTicket = ticket.toObject();
        plainTicket.commentCount = commentsDocuments;
        console.log(ticket);
        return plainTicket;
      })
    );

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
