const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1); // Exit the process if the DB connection fails
  });

// Define Routes
const userRoutes = require("./routes/userRoutes");
const roleRoutes = require("./routes/roleRoutes");
const permissionRoutes = require("./routes/permissionRoutes ");

app.use("/api/users", userRoutes); // User management routes
app.use("/api/roles", roleRoutes); // Role management routes
app.use("/api/permissions", permissionRoutes); // Permission management routes

// Root Endpoint
app.get("/", (req, res) => {
  res.send("Welcome to the RBAC API!");
});

// 404 Error Handling
app.use((req, res, next) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// General Error Handling
app.use((err, req, res, next) => {
  console.error("Internal server error:", err);
  res.status(500).json({ error: "Something went wrong. Please try again later." });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
