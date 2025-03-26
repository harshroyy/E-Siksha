const express = require("express");
const router = express.Router();
const Announcement = require("../models/Announcements");
const { authenticateToken } = require("./userAuth");

// Create Announcement (Teacher Only)
router.post("/", authenticateToken, async (req, res) => {
  try {
    // Check if user is a teacher
    if (req.user.role !== "teacher") {
      return res.status(403).json({ message: "Access denied. Only teachers can create announcements." });
    }

    const { title, description } = req.body;

    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    // Create and save new announcement
    const newAnnouncement = new Announcement({ title, description });
    await newAnnouncement.save();

    res.status(201).json({ message: "Announcement created successfully", announcement: newAnnouncement });
  } catch (error) {
    res.status(500).json({ message: "Error creating announcement", error });
  }
});

// Get All Announcements (Students & Teachers)
router.get("/", authenticateToken, async (req, res) => {
  try {
    // Fetch all announcements sorted by latest first
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "Announcements fetched successfully", announcements });
  } catch (error) {
    res.status(500).json({ message: "Error fetching announcements", error });
  }
});

// Get Single Announcement by ID
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const announcementId = req.params.id;
    const announcement = await Announcement.findById(announcementId);
    
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    
    res.status(200).json({ message: "Announcement fetched successfully", announcement });
  } catch (error) {
    res.status(500).json({ message: "Error fetching announcement", error });
  }
});

// Update Announcement (Teacher Only)
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    // Check if user is a teacher
    if (req.user.role !== "teacher") {
      return res.status(403).json({ message: "Access denied. Only teachers can update announcements." });
    }

    const announcementId = req.params.id;
    const { title, description } = req.body;

    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    // Find and update announcement
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      announcementId,
      { title, description },
      { new: true } // Return the updated document
    );
    
    if (!updatedAnnouncement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.status(200).json({ message: "Announcement updated successfully", announcement: updatedAnnouncement });
  } catch (error) {
    res.status(500).json({ message: "Error updating announcement", error });
  }
});

// Delete Announcement (Teacher Only)
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    // Check if user is a teacher
    if (req.user.role !== "teacher") {
      return res.status(403).json({ message: "Access denied. Only teachers can delete announcements." });
    }

    const announcementId = req.params.id;

    // Find and delete announcement
    const deletedAnnouncement = await Announcement.findByIdAndDelete(announcementId);
    
    if (!deletedAnnouncement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.status(200).json({ message: "Announcement deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting announcement", error });
  }
});

module.exports = router;