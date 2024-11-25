const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,  // The name field is required
    unique: true,    // Ensures unique names for permissions
  },
  description: {
    type: String,
    required: true,  // The description field is required
  }
});

const Permission = mongoose.model("Permission", permissionSchema);

module.exports = Permission;
