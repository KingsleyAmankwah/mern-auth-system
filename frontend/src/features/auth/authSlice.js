import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import authService from "./authService";
import { extractErrorMessage } from "../../utils/utils";

const initialState = {
  user: null,
  users: [],
  isLoading: false,
};

//Register User
export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

//Login User
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

//Logout User
export const logout = createAction("auth/logout", () => {
  authService.logout();
  return {};
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {},
});

export default authSlice.reducer;
