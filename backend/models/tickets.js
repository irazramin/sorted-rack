const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    ticketName: {
      type: String,
      trim: true,
      required: [true, "Please enter a ticket name"],
    },
    ticketCategory: {
      type: String,
      trim: true,
      // enum: ["Mouse", "Monitor", "Headphone", "Keyboard", "USBDongle"],
      required: [true, "Please select a ticket category"],
    },
    ticketStatus: {
      type: String,
      // trim: true,
      // enum: ["New ticket", "In progress", "On hold", "Close", "Resolve"],
      required: false,
      default: function () {
        return "New ticket";
      },
    },
    ticketPriority: {
      type: String,
      trim: true,
      enum: ["High", "Medium", "Low"],
      required: [true, "Please select a ticket priority"],
    },
    ticketDetails: {
      type: String,
      trim: true,
      required: [true, "Please enter ticket details"],
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      required: [true, "User id is required"],
    },
    assignTo: {
      type: mongoose.Types.ObjectId,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);
