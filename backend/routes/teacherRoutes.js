const express = require("express");
const router = express.Router();
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");

// Teacher Log In
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user
    const user = await User.findOne({ username, role: "teacher" });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

// Add a new student (Teacher only)
router.post("/students", authenticateToken, async (req, res) => {
  try {
    // Check if the user is a teacher
    if (req.user.role !== "teacher") {
      return res.status(403).json({ message: "Access denied. Only teachers can add students." });
    }

    const {
      admissionNumber,
      dateOfBirth,
      name,
      aadharCardNumber,
      religion,
      fathersName,
      fathersNumber,
      mothersName,
      gender,
      class: studentClass,
      section,
      rollNumber,
      address,
      academicYear,
      dateOfAdmission,
      mobileNumber,
      attendance,
    } = req.body;

    // Check if admission number already exists
    const existingUser = await User.findOne({ admissionNumber });
    if (existingUser) {
      return res.status(400).json({ message: "Admission number already exists" });
    }

    // Create a new user with role 'student'
    const user = new User({
      admissionNumber,
      dateOfBirth,
      role: "student",
    });
    await user.save();

    // Create a new student
    const student = new Student({
      user: user._id,
      name,
      aadharCardNumber,
      religion,
      fathersName,
      fathersNumber,
      mothersName,
      gender,
      class: studentClass,
      section,
      rollNumber,
      address,
      academicYear,
      dateOfAdmission,
      mobileNumber,
      attendance,
    });
    await student.save();

    res.status(201).json({ message: "Student created successfully", student });
  } catch (error) {
    res.status(500).json({ message: "Error creating student", error });
  }
});

// Update student information (Teacher only)
router.put("/students/:id", authenticateToken, async (req, res) => {
  try {
    // Check if the user is a teacher
    if (req.user.role !== "teacher") {
      return res.status(403).json({ message: "Access denied. Only teachers can update students." });
    }

    const {
      name,
      aadharCardNumber,
      religion,
      fathersName,
      fathersNumber,
      mothersName,
      gender,
      class: studentClass,
      section,
      rollNumber,
      address,
      academicYear,
      dateOfAdmission,
      mobileNumber,
      attendance,
    } = req.body;
    const studentId = req.params.id;

    // Find and update the student
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      {
        name,
        aadharCardNumber,
        religion,
        fathersName,
        fathersNumber,
        mothersName,
        gender,
        class: studentClass,
        section,
        rollNumber,
        address,
        academicYear,
        dateOfAdmission,
        mobileNumber,
        attendance,
      },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student updated successfully", updatedStudent });
  } catch (error) {
    res.status(500).json({ message: "Error updating student", error });
  }
});

// View student details (Teacher only)
router.get("/students/:id", authenticateToken, async (req, res) => {
  try {
    // Check if the user is a teacher
    if (req.user.role !== "teacher") {
      return res.status(403).json({ message: "Access denied. Only teachers can view student details." });
    }

    const studentId = req.params.id;

    // Find the student
    const student = await Student.findById(studentId).populate("user", "admissionNumber dateOfBirth");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student details fetched successfully", student });
  } catch (error) {
    res.status(500).json({ message: "Error fetching student details", error });
  }
});

// View all students (Teacher only)
router.get("/students", authenticateToken, async (req, res) => {
  try {
    // Check if the user is a teacher
    if (req.user.role !== "teacher") {
      return res.status(403).json({ message: "Access denied. Only teachers can view students." });
    }

    const students = await Student.find().populate("user", "admissionNumber dateOfBirth");
    res.status(200).json({ message: "Students fetched successfully", students });
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
});

module.exports = router;