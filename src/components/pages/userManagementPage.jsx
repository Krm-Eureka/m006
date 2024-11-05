import React, { useState, useEffect } from "react";
import {
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Paper,
  TableContainer,
  TextField,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { tableCellClasses } from "@mui/material/TableCell";
import HeaderLayout from "../Header-component";
import userService from "../../services/api-service/userData";
import { Padding } from "@mui/icons-material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));
const initialRows = [
 {
    id: 1,
    name: "สมชาย ใจดี",
    role: "Admin",
    status: "Active",
  },
  { id: 2, name: "สมหญิง มีสุข", role: "User", status: "Inactive" },
  { id: 3, name: "อภิชาติ ดีใจ", role: "Admin", status: "Active" },
  { id: 4, name: "สุภาพร สวยงาม", role: "User", status: "Inactive" },
  { id: 5, name: "กิตติกร มั่นคง", role: "Admin", status: "Active" },
];
const roles = ["Admin", "User", "Manager", "Guest"];
const UserManagement = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    role: "",
    status: "",
  });
  const [filterUsername, setFilterUsername] = useState("");

  const filteredRows = users.filter((row) =>
    row?.name.toLowerCase().includes(filterUsername.toLowerCase())
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUsers = await userService.getAllUsers(setUsers);
        setUsers(fetchedUsers);
        setError(null);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const handleEditClick = (user) => {
    console.log(initialRows.length);
    
    setIsEditing(true);
    userService.getRoleByUserId(user?.id);
    setCurrentUser(user);
    setUpdatedUser(user);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!updatedUser?.name || !updatedUser?.role || !updatedUser?.status) {
      alert("Please fill in all fields.");
      return;
    }
    const updatedRows = users.map((row) =>
      row?.id === currentUser?.id ? updatedUser : row
    );
    setUsers(updatedRows);
    setIsEditing(false);
    setCurrentUser(null);
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  return (
    <>
      <HeaderLayout page="User Management" />
      <div className="content h-screen p-4 bg-gray-200">
        <div className="text-gray-700 bg-gray-400 m-4 rounded-md w-[90%] h-fit mx-auto">
          <div className="title bg-green-500 p-4 rounded-t-md font-bold">
            <p>User Management</p>
          </div>
          <div className="overflow-x-auto">
            <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>ID</StyledTableCell>
                    <StyledTableCell sx={{ width: 300, textAlign: "center" }}>
                      <div className="flex flex-col w-fit">
                        UserName
                        <input
                          placeholder="username"
                          className="rounded-md px-4 py-2 text-black"
                          type="text"
                          title="Filter by Username"
                          value={filterUsername ? filterUsername : ""}
                          onChange={(e) => setFilterUsername(e.target.value)}
                        />
                      </div>
                    </StyledTableCell>
                    <StyledTableCell>Role</StyledTableCell>
                    <StyledTableCell>Status</StyledTableCell>
                    <StyledTableCell>Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRows.map((u) => (
                    <StyledTableRow key={u?.id}>
                      <StyledTableCell>{u?.id}</StyledTableCell>
                      <StyledTableCell>{u?.name}</StyledTableCell>
                      <StyledTableCell>{u?.role}</StyledTableCell>
                      <StyledTableCell>{u?.status}</StyledTableCell>
                      <StyledTableCell>
                        <button
                          className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600"
                          onClick={() => handleEditClick(u)}
                        >
                          Edit
                        </button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>

        <Dialog open={isEditing} onClose={handleClose}>
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Edit user details and save the changes.
            </DialogContentText>
            <TextField
              label="Name"
              name="name"
              value={updatedUser.name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <div className="w-fit flex">
              <TextField
                label="Role"
                name="role"
                value={updatedUser.role}
                onChange={handleInputChange}
                margin="normal"
                sx={{ paddingRight: 2 }}
                select
              >
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Status"
                name="status"
                value={updatedUser.status}
                onChange={handleInputChange}
                sx={{ width: 200 }}
                margin="normal"
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="error">
              Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default UserManagement;
