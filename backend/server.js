const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

// Initialize the app
const app = express();

// Middleware
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS
app.use(express.json()); // Built-in JSON parser

// Load environment variables
dotenv.config();

// Database Connection
const connectDB = require("./conn/conn");
connectDB();

// Import routes
const studentRoutes = require("./routes/studentRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const adminRoutes = require("./routes/adminRoutes");
const announcementRoutes = require("./routes/announcementRoutes");

// Test Route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Mount Routes
app.use("/api/admins", adminRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/announcements", announcementRoutes);

// Start the Server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});