import React, { useState, useEffect } from "react";
import { useApi } from "../hooks/useApi";
import { Button, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

const RoleManagement = () => {
  const { fetchData } = useApi();
  const [roles, setRoles] = useState([]);

  const loadRoles = async () => {
    try {
      const data = await fetchData("roles");
      setRoles(data);
    } catch (err) {
      toast.error("Failed to load roles");
    }
  };

  useEffect(() => {
    loadRoles();
  }, []);

  return (
    <div className="container">
      <h2>Role Management</h2>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Role Name</TableCell>
              <TableCell>Permissions</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.name}</TableCell>
                <TableCell>{role.permissions.join(", ")}</TableCell>
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

export default RoleManagement;
