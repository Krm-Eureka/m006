import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import HeaderLayout from "../Header-component";
import TextField from "@mui/material/TextField";

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
    { id: 1, name: "สมชาย ใจดี", role: "Admin", status: "Active" },
    { id: 2, name: "สมหญิง มีสุข", role: "User", status: "Inactive" },
    { id: 3, name: "อภิชาติ ดีใจ", role: "Admin", status: "Active" },
    { id: 4, name: "สุภาพร สวยงาม", role: "User", status: "Inactive" },
    { id: 5, name: "กิตติกร มั่นคง", role: "Admin", status: "Active" },
    { id: 6, name: "พรรณี น่ารัก", role: "User", status: "Active" },
    { id: 7, name: "ประเสริฐ ชาญชัย", role: "Admin", status: "Inactive" },
    { id: 8, name: "เกศรา อ่อนหวาน", role: "User", status: "Inactive" },
    { id: 9, name: "นพดล รุ่งเรือง", role: "Admin", status: "Active" },
    { id: 10, name: "น้องน้ำ ฟ้าสวย", role: "User", status: "Active" },
    { id: 11, name: "ดวงดาว เกรียงไกร", role: "Admin", status: "Active" },
    { id: 12, name: "จันทร์จิรา เศรษฐี", role: "User", status: "Inactive" },
    { id: 13, name: "พีรพล ปิติ", role: "Admin", status: "Active" },
    { id: 14, name: "รัตนาภรณ์ จิตใจดี", role: "User", status: "Inactive" },
    { id: 15, name: "เศรษฐา คงมั่น", role: "Admin", status: "Active" },
    { id: 16, name: "ทิพย์วรรณ สุขใจ", role: "User", status: "Active" },
    { id: 17, name: "เจษฎา รุ่งเรือง", role: "Admin", status: "Inactive" },
    { id: 18, name: "อังคณา นุ่มนวล", role: "User", status: "Inactive" },
    { id: 19, name: "ชัชวาลย์ ทองสุก", role: "Admin", status: "Active" },
    { id: 20, name: "สุรีย์ สง่างาม", role: "User", status: "Active" },
];


const UserManagement = () => {
  const [rows, setRows] = useState(initialRows);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    role: "",
    status: "",
  });
  const [filterUsername, setFilterUsername] = useState("");
  const [open, setOpen] = useState(false);

  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(filterUsername.toLowerCase())
  );

  const handleEditClick = (user) => {
    setIsEditing(true);
    setCurrentUser(user);
    setUpdatedUser(user);
    setOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleSave = () => {
    if (!updatedUser.name || !updatedUser.role || !updatedUser.status) {
      alert("Please fill in all fields.");
      return;
    }
    const updatedRows = rows.map((row) =>
      row.id === currentUser.id ? updatedUser : row
    );
    setRows(updatedRows);
    setIsEditing(false);
    setCurrentUser(null);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <HeaderLayout page="User Management" />
      <div className="content h-screen p-4 bg-gray-200">
        <div className="text-gray-700 bg-gray-400 m-4 rounded-md w-[90%] h-fit mx-auto">
          <div className="title bg-green-500 p-4 rounded-t-md font-bold">
            <div className="justify-between rounded-sm">
              <p>User Management</p>
              {/* <input
                className="rounded-md"
                type="text"
                title="Filter by Username"
                value={filterUsername}
                onChange={(e) => setFilterUsername(e.target.value)}
              /> */}
            </div>
          </div>
          <div className="overflow-x-auto">
            <TableContainer
              component={Paper}
              sx={{
                maxHeight: 600,
                overflowY: "scroll",
                overflowX: "scroll",
              }}
            >
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>ID</StyledTableCell>
                    <StyledTableCell sx={{ maxWidth: '100px' }}>
                      UserName : {"    "}
                      <input
                       placeholder="username"
                        className="rounded-md px-4 py-2 text-black"
                        type="text"
                        title="Filter by Username"
                        value={filterUsername}
                        onChange={(e) => setFilterUsername(e.target.value)}
                      />
                    </StyledTableCell>
                    <StyledTableCell>Role</StyledTableCell>
                    <StyledTableCell>Status</StyledTableCell>
                    <StyledTableCell>Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRows.map((row) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell>{row.id}</StyledTableCell>
                      <StyledTableCell>{row.name}</StyledTableCell>
                      <StyledTableCell>{row.role}</StyledTableCell>
                      <StyledTableCell>{row.status}</StyledTableCell>
                      <StyledTableCell>
                        <button
                          className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600"
                          onClick={() => handleEditClick(row)}
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

        <Dialog open={open} onClose={handleClose}>
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
            <TextField
              label="Role"
              name="role"
              value={updatedUser.role}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Status"
              name="status"
              value={updatedUser.status}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
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
