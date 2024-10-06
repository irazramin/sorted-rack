const Comment = require("../models/comment");
const createComment = async (data) => {
  try {
    const res = await Comment(data).save();
    return res;
  } catch (error) {
    throw new Error("Comment creation failed: " + error.message);
  }
};

module.exports = {
  createComment,
};
