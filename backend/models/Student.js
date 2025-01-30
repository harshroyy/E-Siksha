const mongoose = require('mongoose');

// Result Schema
const resultSchema = new mongoose.Schema(
  {
    subject: { type: String, required: true },
    marks: { type: Number, required: true },
    grade: { type: String, required: true },
  },
  { timestamps: true }
);

// Achievement Schema
const achievementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

// Student Schema
const studentSchema = new mongoose.Schema(
  {
    admissionNumber: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    dateOfBirth: { type: Date, required: true }, // Add this line
    avatar: {
      type: String,
      default:
        "https://e7.pngegg.com/pngimages/439/19/png-clipart-avatar-user-profile-icon-women-wear-frock-face-holidays-thumbnail.png",
    },
    aadharCardNumber: { type: String, required: true, unique: true },
    religion: { type: String, required: true },
    fathersName: { type: String, required: true },
    fathersNumber: { type: String, required: true },
    mothersName: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    class: { type: String, required: true },
    section: { type: String, required: true },
    rollNumber: { type: String, required: true },
    address: { type: String, required: true },
    academicYear: { type: String, required: true },
    dateOfAdmission: { type: Date, required: true },
    mobileNumber: { type: String, required: true },
    attendance: { type: String, enum: ['Above 75%', 'Below 75%'], required: true },
    results: [resultSchema],
    achievements: [achievementSchema],
  },
  { timestamps: true }
);

// ✅ Prevent duplicate model compilation
const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);

module.exports = Student;
