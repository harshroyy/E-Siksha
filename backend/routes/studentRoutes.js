const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");

// Student Log In
router.post("/login", async (req, res) => {
  try {
    const { admissionNumber, dateOfBirth } = req.body;

    console.log("Request Body:", req.body); // Log the request body

    // Find the student
    const student = await Student.findOne({ admissionNumber });
    if (!student) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("Student from DB:", student); // Log the student object

    // Check if dateOfBirth is defined
    if (!student.dateOfBirth) {
      return res.status(400).json({ message: "Date of birth is missing in the database. Please contact the administrator." });
    }

    // Check date of birth
    const dobFromDB = student.dateOfBirth.toISOString().split('T')[0]; // Extract date part
    const dobFromRequest = new Date(dateOfBirth).toISOString().split('T')[0]; // Extract date part

    console.log("DB DOB:", dobFromDB); // Log the date of birth from the database
    console.log("Request DOB:", dobFromRequest); // Log the date of birth from the request

    if (dobFromDB !== dobFromRequest) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: student._id, role: 'student' },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error); // Log the full error
    res.status(500).json({ message: "Error logging in", error: error.message }); // Include error message in response
  }
});

// View student's own information (Student only)
router.get("/me", authenticateToken, async (req, res) => {
  try {
    // Check if the user is a student
    if (req.user.role !== "student") {
      return res.status(403).json({ 
        message: "Access denied. Only students can view their own information." 
      });
    }

    // Find the student
    const student = await Student.findById(req.user.userId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ 
      message: "Student details fetched successfully", 
      student 
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching student details", error });
  }
});

// Optional: Add route to view results
router.get("/results", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ 
        message: "Access denied. Only students can view their results." 
      });
    }

    const student = await Student.findById(req.user.userId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ 
      message: "Results fetched successfully", 
      results: student.results 
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching results", error });
  }
});

// Optional: Add route to view achievements
router.get("/achievements", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ 
        message: "Access denied. Only students can view their achievements." 
      });
    }

    const student = await Student.findById(req.user.userId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ 
      message: "Achievements fetched successfully", 
      achievements: student.achievements 
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching achievements", error });
  }
});

module.exports = router;