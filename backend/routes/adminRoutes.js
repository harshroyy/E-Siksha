const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const Teacher = require("../models/Teacher");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");

// Admin Sign Up
router.post("/signup", async (req, res) => {
  try {
    const { username, password, name, gender, contactNumber, roleDescription } = req.body;

    // Check if username already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin
    const admin = new Admin({
      username,
      password: hashedPassword,
      name,
      gender,
      contactNumber,
      roleDescription,
    });
    await admin.save();

    res.status(201).json({ message: "Admin created successfully", admin });
  } catch (error) {
    res.status(500).json({ message: "Error creating admin", error });
  }
});

// Admin Log In
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the admin
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: admin._id, role: 'admin' },
      process.env.JWT_SECRET || 'fallback-secret-key',
      { expiresIn: "24h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.log("Login error:", error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

// Add a new teacher (Admin only)
router.post("/teachers", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Only admins can add teachers." });
    }

    const { username, password, name, avatar, gender, dateOfBirth, aadharNumber, appointedSubject, classAppointed, dateOfJoining, contactNumber } = req.body;

    // Check if username or aadharNumber already exists
    const existingTeacher = await Teacher.findOne({ $or: [{ username }, { aadharNumber }] });
    if (existingTeacher) {
      return res.status(400).json({ message: "Username or Aadhar Number already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new teacher
    const teacher = new Teacher({
      username,
      password: hashedPassword,
      name,
      avatar, // Include avatar field
      gender,
      dateOfBirth,
      aadharNumber,
      appointedSubject,
      classAppointed,
      dateOfJoining,
      contactNumber,
    });
    await teacher.save();

    res.status(201).json({ message: "Teacher created successfully", teacher });
  } catch (error) {
    res.status(500).json({ message: "Error creating teacher", error });
  }
});

// Update teacher information (Admin only)
router.put("/teachers/:id", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Only admins can update teachers." });
    }

    const { name, avatar, gender, dateOfBirth, aadharNumber, appointedSubject, classAppointed, dateOfJoining, contactNumber } = req.body;
    const teacherId = req.params.id;

    const updatedTeacher = await Teacher.findByIdAndUpdate(
      teacherId,
      { name, avatar, gender, dateOfBirth, aadharNumber, appointedSubject, classAppointed, dateOfJoining, contactNumber },
      { new: true }
    );

    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({ message: "Teacher updated successfully", updatedTeacher });
  } catch (error) {
    res.status(500).json({ message: "Error updating teacher", error });
  }
});

// Delete a teacher (Admin only)
router.delete("/teachers/:id", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Only admins can delete teachers." });
    }

    const teacherId = req.params.id;

    const deletedTeacher = await Teacher.findByIdAndDelete(teacherId);
    if (!deletedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting teacher", error });
  }
});

// Add a new admin (Admin only)
router.post("/admins", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Only admins can create other admins." });
    }

    const { username, password, name, gender, contactNumber, roleDescription } = req.body;

    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      username,
      password: hashedPassword,
      name,
      gender,
      contactNumber,
      roleDescription,
    });
    await admin.save();

    res.status(201).json({ message: "Admin created successfully", admin });
  } catch (error) {
    res.status(500).json({ message: "Error creating admin", error });
  }
});

// Remove an admin (Admin only)
router.delete("/admins/:id", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Only admins can delete other admins." });
    }

    const adminId = req.params.id;

    const deletedAdmin = await Admin.findByIdAndDelete(adminId);
    if (!deletedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting admin", error });
  }
});

module.exports = router;