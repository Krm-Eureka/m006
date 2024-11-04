import endpoint from "../axios";

const getAllUsers = async (SET) => {
  try {
    const url = `/api/Account/getAllUsers`;
    const res = await endpoint.get(url);
    SET(res.data)
    return res.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
const getUserById = async (ID) => {
  try {
    const url = `/api/Account/getUserById`;
    const response = await endpoint.get(url, { id: ID });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
const getAllRoles = async () => {
  try {
    const url = `/api/Account/getAllRoles`;
    const response = await endpoint.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
const getRoleByUserId = async (UID) => {
  try {
    const url = `/api/Account/getRolesByUserId`;
    const response = await endpoint.get(url, { id: UID });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

const userService = {
  getAllUsers,
  getUserById,
  getAllRoles,
  getRoleByUserId,
};
export default userService;
