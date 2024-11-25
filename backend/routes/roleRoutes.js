const express = require("express");
const router = express.Router();
const Role = require("../models/Role");

// Get all roles
router.get("/", async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch roles" });
  }
});

// Add a new role
// routes/roleRoutes.js
router.post("/", async (req, res) => {
  try {
    const { name, permissions } = req.body;

    // Validate input
    if (!name || !permissions || permissions.length === 0) {
      return res.status(400).json({ error: "Name and permissions are required" });
    }

    // Check if the role already exists
    const existingRole = await Role.findOne({ name });
    if (existingRole) {
      return res.status(400).json({ error: "Role with this name already exists" });
    }

    const role = new Role({ name, permissions });
    await role.save();
    res.status(201).json(role);
  } catch (err) {
    console.error("Error creating role:", err);  // Log the error for debugging
    res.status(500).json({ error: "Failed to create role", details: err.message });
  }
});


// Update role
router.put("/:id", async (req, res) => {
  try {
    const updatedRole = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRole) {
      return res.status(404).json({ error: "Role not found" });
    }
    res.json(updatedRole);
  } catch (err) {
    res.status(400).json({ error: "Failed to update role" });
  }
});

// Delete role
router.delete("/:id", async (req, res) => {
  try {
    const deletedRole = await Role.findByIdAndDelete(req.params.id);
    if (!deletedRole) {
      return res.status(404).json({ error: "Role not found" });
    }
    res.json({ message: "Role deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete role" });
  }
});

module.exports = router;
