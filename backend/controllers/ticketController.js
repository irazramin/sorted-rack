const StatusCodes = require("http-status-codes");
const User = require("../models/user");
const Ticket = require("../models/tickets");
const ticketService = require("../services/ticketService");
const CustomError = require("../errors");
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

    const response = await ticketService.createTicket({
      ticketName,
      ticketCategory,
      ticketStatus,
      ticketPriority,
      ticketDetails,
      userId,
    });

    return res.status(StatusCodes.OK).json({ data: response });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

module.exports.getAllTickets = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId);
    const { category, status, priority, search, page, pageSize } = req.query;

    const query = {
      userId,
    };

    if (search) {
      query.ticketName = { $regex: new RegExp(search, "i") };
    }

    if (category) {
      query.ticketCategory = category;
    }

    if (priority) {
      query.ticketPriority = priority;
    }

    if (status) {
      query.ticketStatus = status;
    }

    console.log(query);

    if (!user) throw new CustomError.NotFoundError("User not found!");

    const response = await ticketService.getAllTickets(query, page, pageSize);
    const totalData = await Ticket.countDocuments({ userId });

    return res.status(StatusCodes.OK).json({ data: response, totalData });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

module.exports.getAllTicketsForAdmin = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId);

    const { category, status, priority, search, page, pageSize } = req.query;

    console.log("from controller");

    const query = {};

    if (search) {
      query.ticketName = { $regex: new RegExp(search, "i") };
    }

    if (category) {
      query.ticketCategory = category;
    }

    if (priority) {
      query.ticketPriority = priority;
    }

    if (status) {
      query.ticketStatus = status;
    }

    if (!user) throw new CustomError.NotFoundError("User not found!");

    const response = await ticketService.getAllTickets(query, page, pageSize);
    const totalData = await Ticket.countDocuments({});

    return res.status(StatusCodes.OK).json({ data: response, totalData });
  } catch (error) {
    console.log(error)
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

module.exports.findTicketById = async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;
    const user = await User.findById(userId);

    if (!user) throw new CustomError.NotFoundError("User not found!");

    const response = await ticketService.findTicketById(id);

    return res.status(StatusCodes.OK).json({ data: response });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

module.exports.findTicketByIdForAdmin = async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;
    const user = await User.findById(userId);

    if (!user) throw new CustomError.NotFoundError("User not found!");

    const response = await ticketService.findTicketById(id);

    return res.status(StatusCodes.OK).json({ data: response });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

module.exports.findTicketByIdAndUpdate = async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;
    const {
      ticketName,
      ticketCategory,
      ticketStatus,
      ticketPriority,
      ticketDetails,
    } = req.body;

    const user = await User.findById(userId);
    const ticket = await ticketService.findTicketById(id);

    if (!user) throw new CustomError.NotFoundError("User not found!");
    if (!ticket) throw new CustomError.NotFoundError("Ticket not found!");

    const response = await ticketService.findTicketByIdAndUpdate(id, {
      ticketName,
      ticketCategory,
      ticketStatus,
      ticketPriority,
      ticketDetails,
    });

    return res.status(StatusCodes.OK).json({ data: response });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

module.exports.findTicketByIdAndDelete = async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;

    const user = await User.findById(userId);
    const ticket = await ticketService.findTicketById(id);

    if (!user) throw new CustomError.NotFoundError("User not found!");
    if (!ticket) throw new CustomError.NotFoundError("Ticket not found!");

    const response = await ticketService.findTicketByIdAndDelete(id);

    return res.status(StatusCodes.OK).json({ data: response });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

module.exports.changeTicketStatus = async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;
    const { ticketStatus } = req.body;

    console.log(ticketStatus);

    const user = await User.findById(userId);
    const ticket = await ticketService.findTicketById(id);

    if (!user) throw new CustomError.NotFoundError("User not found!");
    if (!ticket) throw new CustomError.NotFoundError("Ticket not found!");

    const response = await ticketService.changeTicketStatus(id, ticketStatus);

    return res.status(StatusCodes.OK).json({ data: response });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};
module.exports.assignTicket = async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;
    const user = await User.findById(userId);
    const { assignId } = req.body;

    if (!user) throw new CustomError.NotFoundError("User not found!");

    const response = await ticketService.findTicketByIdAndUpdate(id, {
      assignTo: assignId,
    });

    return res.status(StatusCodes.OK).json({ data: response });
  } catch (error) {
    return res.status(StatusCodes.BAD_GATEWAY).json({ message: error });
  }
};

module.exports.getAssignedTickets = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId);
    const { adminId } = req.params;

    const { category, status, priority, search, page, pageSize } = req.query;

    const query = {};

    if (search) {
      query.ticketName = { $regex: new RegExp(search, "i") };
    }

    if (category) {
      query.ticketCategory = category;
    }

    if (priority) {
      query.ticketPriority = priority;
    }

    if (status) {
      query.ticketStatus = status;
    }

    if (userId) {
      query.assignTo = userId;
    }

    if (!user) throw new CustomError.NotFoundError("User not found!");

    const response = await ticketService.getAllTickets(query, page, pageSize);
    const totalData = await Ticket.countDocuments({ assignTo: userId });

    return res.status(StatusCodes.OK).json({ data: response, totalData });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};
