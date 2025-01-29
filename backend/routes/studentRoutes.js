// studentRoutes.js
const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");

// Student Log In
router.post("/login", async (req, res) => {
  try {
    const { admissionNumber, dateOfBirth } = req.body;

    // Find the user
    const user = await User.findOne({ admissionNumber, role: "student" });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check date of birth
    if (user.dateOfBirth.toISOString() !== new Date(dateOfBirth).toISOString()) {
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

// View student's own information (Student only)
router.get("/me", authenticateToken, async (req, res) => {
  try {
    // Check if the user is a student
    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Access denied. Only students can view their own information." });
    }

    // Find the student
    const student = await Student.findOne({ user: req.user.userId }).populate(
      "user",
      "admissionNumber dateOfBirth"
    );
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student details fetched successfully", student });
  } catch (error) {
    res.status(500).json({ message: "Error fetching student details", error });
  }
});

module.exports = router;