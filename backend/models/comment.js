const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, "Ticket id is required"],
    },
    ticketId: {
      type: mongoose.Types.ObjectId,
      required: [true, "Ticket id is required"],
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: [true, "User id is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
