const express = require("express");
const router = express.Router();
const Permission = require("../models/Permission");

// Get all permissions
router.get("/", async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.json(permissions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch permissions" });
  }
});

// Add a new permission
router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;

    // Validate the input
    if (!name || !description) {
      return res.status(400).json({ error: "Name and description are required" });
    }

    // Check if permission with this name already exists
    const existingPermission = await Permission.findOne({ name });
    if (existingPermission) {
      return res.status(400).json({ error: "Permission already exists" });
    }

    // Create the new permission
    const permission = new Permission({ name, description });
    await permission.save();

    res.status(201).json(permission);
  } catch (err) {
    console.error("Error creating permission:", err);  // Log the full error for debugging
    res.status(400).json({ error: "Failed to create permission", details: err.message });
  }
});


// Update permission
router.put("/:id", async (req, res) => {
  try {
    const updatedPermission = await Permission.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPermission) {
      return res.status(404).json({ error: "Permission not found" });
    }
    res.json(updatedPermission);
  } catch (err) {
    res.status(400).json({ error: "Failed to update permission" });
  }
});

// Delete permission
router.delete("/:id", async (req, res) => {
  try {
    const deletedPermission = await Permission.findByIdAndDelete(req.params.id);
    if (!deletedPermission) {
      return res.status(404).json({ error: "Permission not found" });
    }
    res.json({ message: "Permission deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete permission" });
  }
});

module.exports = router;
