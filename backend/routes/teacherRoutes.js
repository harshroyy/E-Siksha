const express = require("express");
const router = express.Router();
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");

// Teacher Log In
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the teacher
    const teacher = await Teacher.findOne({ username });
    if (!teacher) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: teacher._id, role: 'teacher' },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

// Get teacher profile (Teacher only)
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "teacher") {
      return res.status(403).json({ message: "Access denied. Only teachers can view their profile." });
    }

    const teacherId = req.user.userId;

    // Find the teacher
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({ message: "Teacher details fetched successfully", teacher });
  } catch (error) {
    res.status(500).json({ message: "Error fetching teacher details", error });
  }
});

// Add a new student (Teacher only)
router.post("/students", authenticateToken, async (req, res) => {
  try {
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

    // Validate required fields
    if (!admissionNumber || !dateOfBirth || !name || !aadharCardNumber || !religion || !fathersName || !fathersNumber || !mothersName || !gender || !studentClass || !section || !rollNumber || !address || !academicYear || !dateOfAdmission || !mobileNumber || !attendance) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if admission number already exists
    const existingStudent = await Student.findOne({ admissionNumber });
    if (existingStudent) {
      return res.status(400).json({ message: "Admission number already exists" });
    }

    // Create a new student
    const student = new Student({
      admissionNumber,
      dateOfBirth: new Date(dateOfBirth),
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
      dateOfAdmission: new Date(dateOfAdmission),
      mobileNumber,
      attendance,
    });
    await student.save();

    res.status(201).json({ message: "Student created successfully", student });
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({ message: "Error creating student", error: error.message });
  }
});

// Update student information (Teacher only)
router.put("/students/:id", authenticateToken, async (req, res) => {
  try {
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
      dateOfBirth,
    } = req.body;
    const studentId = req.params.id;

    // Validate required fields
    if (!name || !aadharCardNumber || !religion || !fathersName || !fathersNumber || !mothersName || !gender || !studentClass || !section || !rollNumber || !address || !academicYear || !dateOfAdmission || !mobileNumber || !attendance || !dateOfBirth) {
      return res.status(400).json({ message: "All fields are required" });
    }

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
        dateOfAdmission: new Date(dateOfAdmission),
        mobileNumber,
        attendance,
        dateOfBirth: new Date(dateOfBirth),
      },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student updated successfully", updatedStudent });
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ message: "Error updating student", error: error.message });
  }
});

// View student details (Teacher only)
router.get("/students/:id", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "teacher") {
      return res.status(403).json({ message: "Access denied. Only teachers can view student details." });
    }

    const studentId = req.params.id;

    const student = await Student.findById(studentId);
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
    if (req.user.role !== "teacher") {
      return res.status(403).json({ message: "Access denied. Only teachers can view students." });
    }

    const students = await Student.find();
    res.status(200).json({ message: "Students fetched successfully", students });
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
});

// Get Dashboard Stats
router.get("/dashboard-stats", authenticateToken, async (req, res) => {
  try {
    // Check if user is a teacher
    if (req.user.role !== "teacher") {
      return res.status(403).json({ message: "Access denied. Only teachers can access this data." });
    }

    // Count total students
    const totalStudents = await Student.countDocuments();
    
    // Count total announcements
    const Announcement = require("../models/Announcements");
    const announcements = await Announcement.countDocuments();

    res.status(200).json({ 
      totalStudents, 
      announcements 
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ message: "Error fetching dashboard stats", error });
  }
});
module.exports = router;