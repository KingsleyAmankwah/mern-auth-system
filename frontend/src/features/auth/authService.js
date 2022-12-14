import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
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

//Get User profile
const getUser = async () => {
  const response = await axios.get(API_URL + "getUser");
  return response.data;
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

const authService = {
  register,
  login,
  logout,
  getUser,
  updateUser,
  getUsers,
};

export default authService;
