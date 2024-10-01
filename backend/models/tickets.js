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
      enum: ["Mouse", "Monitor", "Headphone", "Keyboard", "USBDongle"],
      required: [true, "Please select a ticket category"],
    },
    ticketStatus: {
      type: String,
      trim: true,
      enum: ["New Ticket", "In progress", "On hold", "Close", "Resolve"],
      required: [true, "Please select a ticket status"],
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);
