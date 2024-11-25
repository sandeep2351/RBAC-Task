import React, { useState, useEffect } from "react";
import { useApi } from "../hooks/useApi";
import { Button, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

const UserManagement = () => {
  const { fetchData } = useApi();
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    try {
      const data = await fetchData("users");
      setUsers(data);
    } catch (err) {
      toast.error("Failed to load users");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="container">
      <h2>User Management</h2>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" style={{ marginRight: "10px" }}>
                    Edit
                  </Button>
                  <Button variant="outlined" color="secondary">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Toaster />
    </div>
  );
};

export default UserManagement;
