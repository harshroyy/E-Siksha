const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "https://e7.pngegg.com/pngimages/439/19/png-clipart-avatar-user-profile-icon-women-wear-frock-face-holidays-thumbnail.png",
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    aadharNumber: {
      type: String,
      required: true,
      unique: true,
    },
    appointedSubject: {
      type: [String],
      required: true,
    },
    classAppointed: {
      type: String,
      required: true,
    },
    dateOfJoining: {
      type: Date,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", teacherSchema);