const commentRepository = require("../Repositories/commentRepository");
const createComment = async (body) => {
  try {
    const data = await commentRepository.createComment(body);
    return data;
  } catch (error) {
    throw new Error("Comment creating failed: " + error.message);
  }
};

const getTicketById = async (id) => {
  try {
    const data = await commentRepository.getTicketById(id);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Comment creating failed: " + error.message);
  }
};

module.exports = {
  createComment,
  getTicketById,
};
