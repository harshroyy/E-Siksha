const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now }, // Auto-generated date
  },
  { timestamps: true }
);

const Announcement =
  mongoose.models.Announcement || mongoose.model("Announcement", announcementSchema);

module.exports = Announcement;
