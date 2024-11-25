import React, { useState, useEffect } from "react";
import { useApi } from "../hooks/useApi";
import { Button, Table, TableHead, TableRow, TableCell, TableBody, Paper, Checkbox } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

const PermissionManagement = () => {
  const { fetchData } = useApi();
  const [permissions, setPermissions] = useState([]);
  const [roles, setRoles] = useState([]);

  const loadPermissions = async () => {
    try {
      const data = await fetchData("permissions");
      setPermissions(data);
    } catch (err) {
      toast.error("Failed to load permissions");
    }
  };

  const loadRoles = async () => {
    try {
      const data = await fetchData("roles");
      setRoles(data);
    } catch (err) {
      toast.error("Failed to load roles");
    }
  };

  useEffect(() => {
    loadPermissions();
    loadRoles();
  }, []);

  return (
    <div className="container">
      <h2>Permission Management</h2>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Role</TableCell>
              {permissions.map((perm) => (
                <TableCell key={perm}>{perm}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.name}</TableCell>
                {permissions.map((perm) => (
                  <TableCell key={perm}>
                    <Checkbox
                      defaultChecked={role.permissions.includes(perm)}
                      onChange={() => toast.success(`${perm} updated for ${role.name}`)}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Toaster />
    </div>
  );
};

export default PermissionManagement;