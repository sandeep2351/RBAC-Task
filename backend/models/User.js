const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,  // Ensure that the username is required
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['Admin', 'Manager', 'Viewer'],  // Example of roles
  },
  status: {
    type: String,
    default: 'Active',  // Default status if not provided
  },
});

module.exports = mongoose.model("User", userSchema);
