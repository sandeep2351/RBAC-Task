// models/Role.js
const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,  // Ensure 'name' is required
    unique: true     // Make the role name unique
  },
  permissions: {
    type: [String],  // Array of permissions
    required: true   // Ensure 'permissions' is required
  }
});

module.exports = mongoose.model('Role', RoleSchema);
