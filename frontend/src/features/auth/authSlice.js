import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import authService from "./authService";
import { extractErrorMessage } from "../../utils/utils";

const initialState = {
  user: null,
  users: [],
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {},
});

export default authSlice.reducer;
