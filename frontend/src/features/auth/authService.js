import axios from "axios";

const BACKEND_URL = "http://localhost:5000";
export const API_URL = `${BACKEND_URL}/api/users/`;

//Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);

  return response.data;
};

//Login User
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  return response.data;
};

//Logout User
const logout = async () => {
  const response = await axios.get(API_URL + "logout");
  return response.data.message;
};

// Update profile
const updateUser = async (userData) => {
  const response = await axios.patch(API_URL + "updateUser", userData);
  return response.data;
};

// Get Users
const getUsers = async () => {
  const response = await axios.get(API_URL + "getUsers");

  return response.data;
};

// Delete User
const deleteUser = async (id) => {
  const response = await axios.delete(API_URL + id);

  return response.data.message;
};

const authService = {
  register,
  login,
  logout,
  updateUser,
  getUsers,
  deleteUser,
};

export default authService;
