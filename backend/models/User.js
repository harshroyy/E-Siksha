const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [
        function () {
          return this.role !== 'student';
        },
        'Username is required for teachers and admins',
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [
        function () {
          return this.role !== 'student';
        },
        'Password is required for teachers and admins',
      ],
    },
    admissionNumber: {
      type: String,
      required: [
        function () {
          return this.role === 'student';
        },
        'Admission number is required for students',
      ],
      unique: true, 
      sparse: true, // This is the key change
    },
    dateOfBirth: {
      type: Date,
      required: [
        function () {
          return this.role === 'student';
        },
        'Date of birth is required for students',
      ],
    },
    role: {
      type: String,
      enum: ['student', 'admin', 'teacher'],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);