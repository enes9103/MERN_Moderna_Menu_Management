import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [activate, setActivate] = useState({});
  const columns = [
    { id: "images", label: "Users Name", minWidth: 100 },
    { id: "product", label: "Email", minWidth: 100 },

    { id: "edit", label: "Activate User", minWidth: 100 },
  ];

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/user/");
      const filteredUsers = response.data.filter(
        (user) => user.role === "user"
      );
      setUsers(filteredUsers);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const activateUser = async (event, id) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/user/activate/${id}`
      );
      setActivate(response.data);
      fetchUsers();
      // send email to user that his account have been activated
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <React.Fragment>
      <Title>User Activation List</Title>

      <TableContainer sx={{ maxHeight: "600px" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user, i) => (
              <TableRow key={i}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <div>
                    <button
                      type="submit"
                      className="prodash-button"
                      onClick={(event) => activateUser(event, user._id)}
                      disabled={user.activate}
                    >
                      {user.activate ? "Activated" : "Activate User"}
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
