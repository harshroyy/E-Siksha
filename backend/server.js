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

// Import Routes
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const studentRoutes = require("./routes/studentRoutes");

// Test Route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Mount Routes
app.use("/api/users", userRoutes); // General user routes (e.g., change password, profile)
app.use("/api/admins", adminRoutes); // Admin-specific routes
app.use("/api/teachers", teacherRoutes); // Teacher-specific routes
app.use("/api/students", studentRoutes); // Student-specific routes

// Start the Server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});