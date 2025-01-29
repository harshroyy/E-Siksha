const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const Teacher = require("../models/Teacher");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");

// Admin Sign Up
router.post("/signup", async (req, res) => {
  try {
    const { username, password, name, gender, contactNumber, roleDescription } =
      req.body;

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with role 'admin'
    const user = new User({
      username,
      password: hashedPassword,
      role: "admin",
    });
    await user.save();

    // Create a new admin
    const admin = new Admin({
      user: user._id,
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

    // Find the user
    const user = await User.findOne({ username, role: "admin" });
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
      process.env.JWT_SECRET || 'fallback-secret-key', // Add fallback
      { expiresIn: "24h" }
    );

    // // Add debug logging
    // console.log("Token generated:", token ? 'Success' : 'Failed');

    // // Check if JWT_SECRET exists
    // if (!process.env.JWT_SECRET) {
    //   console.log("Warning: JWT_SECRET is not set");
    // }

    res.status(200).json({ message: "Login successful", token });
    } catch (error) {
    console.log("Login error:", error); // Add detailed error logging
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

// Add a new teacher (Admin only)
router.post("/teachers", authenticateToken, async (req, res) => {
  try {
    // Check if the user is an admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Only admins can add teachers." });
    }

    const { username, password, name, gender, subjectSpecialization, contactNumber } =
      req.body;

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with role 'teacher'
    const user = new User({
      username,
      password: hashedPassword,
      role: "teacher",
    });
    await user.save();

    // Create a new teacher
    const teacher = new Teacher({
      user: user._id,
      name,
      gender,
      subjectSpecialization,
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
    // Check if the user is an admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Only admins can update teachers." });
    }

    const { name, gender, subjectSpecialization, contactNumber } = req.body;
    const teacherId = req.params.id;

    // Find and update the teacher
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      teacherId,
      { name, gender, subjectSpecialization, contactNumber },
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
    // Check if the user is an admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Only admins can delete teachers." });
    }

    const teacherId = req.params.id;

    // Find and delete the teacher
    const deletedTeacher = await Teacher.findByIdAndDelete(teacherId);
    if (!deletedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Delete the associated user
    await User.findByIdAndDelete(deletedTeacher.user);

    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting teacher", error });
  }
});

// Add a new admin (Admin only)
router.post("/admins", authenticateToken, async (req, res) => {
  try {
    // Check if the user is an admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Only admins can create other admins." });
    }

    const { username, password, name, gender, contactNumber, roleDescription } =
      req.body;

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with role 'admin'
    const user = new User({
      username,
      password: hashedPassword,
      role: "admin",
    });
    await user.save();

    // Create a new admin
    const admin = new Admin({
      user: user._id,
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
    // Check if the user is an admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Only admins can delete other admins." });
    }

    const adminId = req.params.id;

    // Find and delete the admin
    const deletedAdmin = await Admin.findByIdAndDelete(adminId);
    if (!deletedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Delete the associated user
    await User.findByIdAndDelete(deletedAdmin.user);

    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting admin", error });
  }
});

module.exports = router;