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
import ADD from "../../assets/svg/addnew.svg";
import Loading from "../loadingComponent";

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

// const roles = ["Admin", "User", "Manager", "Guest"];

const UserManagement = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAddNew, setIsAddNew] = useState(false);
  const [users, setUsers] = useState([]);
  const [roles, setRole] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    roles: "",
    isVerified: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const getRoleUser = async () => {
    try {
      const fetchedRole = await userService.getAllRoles(setRole);
      setRole(fetchedRole);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };
  const handleEditClick = (user) => {
    console.log(user);
    getRoleUser();
    setIsEditing(true);
    setCurrentUser(user);
    setUpdatedUser(user);
  };
  const handleAddClick = () => {
    getRoleUser();
    setIsAddNew(true);
    setUpdatedUser({
      userName: "",
      firstName: "",
      lastName: "",
      roles: "",
      isVerified: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };
  const handleInputChange = (e = {}) => {
    const { name, value } = e.target || {};
    console.log(name," " , value , );
    if (name) {
      setUpdatedUser((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleAdd = async () => {
    // console.log("userName", updatedUser.userName, !updatedUser.userName);
    // console.log("firstName", updatedUser.firstName, !updatedUser.firstName);
    // console.log("lastName", updatedUser.lastName, !updatedUser.lastName);
    // console.log("roles", updatedUser.roles, !updatedUser.roles);
    // console.log("email", updatedUser.email, !updatedUser.email);
    // console.log("password", updatedUser.password, !updatedUser.password);
    // console.log(
    //   "confirmPassword",
    //   updatedUser.confirmPassword,
    //   !updatedUser.confirmPassword
    // );
    // console.log("Verified", updatedUser.isVerified, !updatedUser.isVerified);
    if (
      !updatedUser.userName ||
      !updatedUser.firstName ||
      !updatedUser.lastName ||
      !updatedUser.roles ||
      !updatedUser.email ||
      !updatedUser.password ||
      !updatedUser.confirmPassword
    ) {
      alert("Please fill in all fields.");
      return;
    }
    if (updatedUser.password !== updatedUser.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await userService.postNewUser({
        userName: updatedUser.userName,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        // roles: updatedUser.roles,
        // isVerified: true,
        email: updatedUser.email,
        password: updatedUser.password,
        confirmPassword: updatedUser.confirmPassword
      });

      // Assuming response contains the newly added user data
      setUsers((prevUsers) => [...prevUsers, response.data]);
      console.log(response.data.id);

      // Resetting the form
      setUpdatedUser({
        userName: "",
        firstName: "",
        lastName: "",
        roles: "",
        isVerified: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setIsAddNew(false);
    } catch (error) {
      console.error("Error adding user:", error);
      alert("An error occurred while adding the user. Please try again.");
    }
  };
  const handleSave = async () => {
    console.log("userName", updatedUser.userName, !updatedUser.userName);
    console.log("firstName", updatedUser.firstName, !updatedUser.firstName);
    console.log("lastName", updatedUser.lastName, !updatedUser.lastName);
    console.log("roles", updatedUser.roles, !updatedUser.roles);
    console.log("email", updatedUser.email, !updatedUser.email);
    console.log("password", updatedUser.password, !updatedUser.password);
    console.log(
      "confirmPassword",
      updatedUser.confirmPassword,
      !updatedUser.confirmPassword
    );
    console.log("Verified", updatedUser.isVerified, !updatedUser.isVerified);
    if (
      !updatedUser.userName ||
      !updatedUser.firstName ||
      !updatedUser.lastName ||
      !updatedUser.roles ||
      !updatedUser.email
      // || !updatedUser.password ||
      // !updatedUser.confirmPassword
    ) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      const response = await userService.updateUser(
        currentUser.id,
        updatedUser
      );
      setUsers(users.map((u) => (u.id === currentUser.id ? response.data : u)));
      setIsEditing(false);
      setCurrentUser(null);
    } catch (error) {
      console.error("Error saving user:", error);
      alert("An error occurred while saving the user.");
    }
    setIsEditing(false);
  };

  const handleClose = () => {
    setIsEditing(false);
    setIsAddNew(false);
  };

  return (
    <>
      <HeaderLayout page="User Management" />
      <div className="content h-screen p-4 bg-gray-200">
        <div className="text-gray-700 bg-gray-400 m-4 rounded-md w-[90%] h-fit mx-auto">
          <div className="title bg-green-500 p-4 rounded-t-md font-bold flex justify-between">
            <p>User Management</p>
            {error && <div className="error text-red-700">{error}</div>}
            <p
              className="flex hover:bg-blue-300 rounded-xl p-2 bg-blue-500 text-black cursor-pointer"
              onClick={handleAddClick}
            >
              <img
                src={ADD}
                alt="addNewUser"
                className="w-6 h-6 p-1 mr-2 rounded-xl cursor-pointer hover:bg-blue-300"
              />
              Add New User
            </p>
          </div>
          <div className="overflow-x-auto">
            <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">ID</StyledTableCell>
                    <StyledTableCell align="center">User Name</StyledTableCell>
                    <StyledTableCell align="center">Name</StyledTableCell>
                    <StyledTableCell align="center">Role</StyledTableCell>
                    <StyledTableCell align="center">Status</StyledTableCell>
                    <StyledTableCell align="center">Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                {users.length <= 0 ? (
                  <TableBody>
                    <StyledTableRow>
                      <TableCell colSpan={6} align="center">
                        <div className="flex flex-col items-center justify-center text-center p-4">
                          <p className="text-gray-600 font-semibold mb-2">
                            No data available
                          </p>
                          <Loading text="Data Not Found . . ." />
                        </div>
                      </TableCell>
                    </StyledTableRow>
                  </TableBody>
                ) : (
                  <TableBody>
                    {users.map((u) => (
                      <StyledTableRow key={u?.id}>
                        <StyledTableCell align="left">
                          {u?.id}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {u?.userName}
                        </StyledTableCell>
                        <StyledTableCell align="center">{`${u?.firstName} ${u?.lastName}`}</StyledTableCell>
                        <StyledTableCell align="center">
                          {u?.roles}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {u?.isVerified === true ? (
                            <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                              Verified
                            </span>
                          ) : (
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                              Not Verified
                            </span>
                          )}
                        </StyledTableCell>
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
                )}
              </Table>
            </TableContainer>
          </div>
        </div>

        {/* Edit User Dialog */}
        <Dialog open={isEditing} onClose={handleClose}>
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Edit user details and save the changes.
            </DialogContentText>
            <TextField
              label="User Name"
              name="userName"
              value={updatedUser.userName}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="First Name"
              name="firstName"
              value={updatedUser.firstName}
              onChange={handleInputChange}
              sx={{ width: 250, paddingRight: 2 }}
              margin="normal"
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={updatedUser.lastName}
              onChange={handleInputChange}
              sx={{ width: 250 }}
              margin="normal"
            />
            <TextField
              label="Role"
              name="roles"
              value={updatedUser.roles}
              onChange={handleInputChange}
              margin="normal"
              select
              sx={{ width: 250, paddingRight: 2 }}
            >
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.roleName}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Status"
              name="isVerified"
              value={updatedUser.isVerified}
              onChange={handleInputChange}
              sx={{ width: 250 }}
              margin="normal"
            />
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

        {/* Add New User Dialog */}
        <Dialog open={isAddNew} onClose={handleClose}>
          <DialogTitle>Add New User</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Fill in the details of the new user to add.
            </DialogContentText>
            <div className=" flex justify-between">
              <TextField
                label="User Name"
                name="userName"
                value={updatedUser.userName}
                onChange={handleInputChange}
                sx={{ width: 250, paddingRight: 2 }}
                margin="normal"
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                value={updatedUser.email}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            </div>
            <div className=" flex justify-between">
              <TextField
                label="First Name"
                name="firstName"
                value={updatedUser.firstName}
                onChange={handleInputChange}
                sx={{ width: 250, paddingRight: 2 }}
                margin="normal"
              />
              <TextField
                label="Last Name"
                name="lastName"
                value={updatedUser.lastName}
                onChange={handleInputChange}
                sx={{ width: 250, paddingRight: 2 }}
                margin="normal"
              />
              <TextField
                label="Role"
                name="roles"
                value={updatedUser.roles}
                onChange={handleInputChange}
                margin="normal"
                select
                sx={{ width: 250 }}
              >
                {roles.map((role) => (
                  <MenuItem key={role.id} value={role.roleName}>
                    {role.roleName}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <TextField
              label="Password"
              name="password"
              type="password"
              value={updatedUser.password}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={updatedUser.confirmPassword}
              onChange={handleInputChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor:
                      updatedUser.password === updatedUser.confirmPassword
                        ? "green"
                        : "red",
                  },
                  "&:hover fieldset": {
                    borderColor:
                      updatedUser.password === updatedUser.confirmPassword
                        ? "green"
                        : "red",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor:
                      updatedUser.password === updatedUser.confirmPassword
                        ? "green"
                        : "red",
                  },
                },
              }}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="error">
              Cancel
            </Button>
            <Button onClick={handleAdd} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default UserManagement;
