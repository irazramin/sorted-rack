const mongoose = require("mongoose");
const User = require("./user");

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
      required: [true, "Please select a ticket category"],
    },
    ticketStatus: {
      type: String,
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
      ref: "User",
      required: [true, "User id is required"],
    },
    assignTo: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: false,
    },
    uniqueId: {
      type: String,
      required: [true, "Unique ID is required"],
    },
    
  },
  { timestamps: true }
);

ticketSchema.pre("validate", async function (next) {
  const ticket = this;

  if (ticket.isNew && !ticket.uniqueId) {
    let isUnique = false;
    const user = await User.findById(ticket.userId);

    if (!user || !user.branch) {
      return next(new Error("User or branch not found!"));
    }

    const branchName = user.branch.toLowerCase();

    while (!isUnique) {
      const randomNumber = Math.floor(10000 + Math.random() * 90000);
      const uniqueId = `${branchName}_${randomNumber}`;

      const existingTicket = await mongoose.models.Ticket.findOne({
        uniqueId: uniqueId,
      });
      if (!existingTicket) {
        ticket.uniqueId = uniqueId;
        isUnique = true;
      }
    }
  }

  next();
});

module.exports = mongoose.model("Ticket", ticketSchema);
