import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import "./../styles/Dashboard.css"; // Import the correct CSS file

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>
      <div className="button-section">
        <Link to="/users" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary">
            Manage Users
          </Button>
        </Link>
        <Link to="/roles" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="secondary">
            Manage Roles
          </Button>
        </Link>
        <Link to="/permissions" style={{ textDecoration: "none" }}>
          <Button variant="contained" style={{ backgroundColor: "#4caf50", color: "#fff" }}>
            Manage Permissions
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
