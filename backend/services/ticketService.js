const ticketRepository = require("../Repositories/ticketRepository");

module.exports.createTicket = async (body) => {
  try {
    const data = await ticketRepository.createTicket(body);
    return data;
  } catch (error) {
    throw new Error("Ticket creating failed: " + error.message);
  }
};

module.exports.getAllTickets = async () => {
  try {
    const data = await ticketRepository.getAllTickets();
    return data;
  } catch (error) {
    throw new Error("Ticket fetching failed: " + error.message);
  }
};

module.exports.findTicketById = async (id) => {
  try {
    const data = await ticketRepository.findTicketById(id);
    return data;
  } catch (error) {
    throw new Error("Ticket fetching failed: " + error.message);
  }
};
