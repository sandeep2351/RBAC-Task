const express = require("express");
const bcrypt = require("bcryptjs");  // For password hashing
const User = require("../models/User");
const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users", details: err.message });
  }
});

// Add a new user
router.post("/", async (req, res) => {
  const { username, email, password, role } = req.body;

  // Validate input
  if (!username || !email || !password || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      username,  // Add username to the user object
      email,
      password: hashedPassword,  // Store the hashed password
      role
    });

    // Save the user to the database
    await user.save();

    // Return the created user (without the password)
    const userResponse = {
      username: user.username,
      email: user.email,
      role: user.role,
      id: user._id,
    };

    res.status(201).json(userResponse);  // Return user details without password
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create user", details: err.message });
  }
});



module.exports = router;
