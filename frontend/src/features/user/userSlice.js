import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { extractErrorMessage } from "../../utils/utils";
import { toast } from "react-toastify";
import userService from "./userService";

const initialState = {
  user: null,
  users: [],
  isLoading: false,
  message: "",
};

//! Get User
export const getUser = createAsyncThunk("user/getUser", async (_, thunkAPI) => {
  try {
    return await userService.getUser();
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error));
  }
});

//! Update User
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userData, thunkAPI) => {
    try {
      return await userService.updateUser(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

//! getUsers
export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (_, thunkAPI) => {
    try {
      return await userService.getUsers();
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);
//! deleteUser
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, thunkAPI) => {
    try {
      return await userService.deleteUser(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

//! change Password
export const changePassword = createAsyncThunk(
  "",
  async (userData, thunkAPI) => {
    try {
      return await userService.changePassword(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

//! forgot Password
export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (userData, thunkAPI) => {
    try {
      return await userService.forgotPassword(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

//! resetPassword
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ userData, resetToken }, thunkAPI) => {
    try {
      return await userService.resetPassword(userData, resetToken);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

//! send Verification Email
export const sendVerificationEmail = createAsyncThunk(
  "user/sendVerificationEmail",
  async (_, thunkAPI) => {
    try {
      return await userService.sendVerificationEmail();
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

//! verify User
export const verifyUser = createAsyncThunk(
  "auth/verifyUser",
  async (verificationToken, thunkAPI) => {
    try {
      return await userService.verifyUser(verificationToken);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      //? Get User
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })

      //? Update user
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        toast.success("Profile Updated");
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.message = action.payload;
      })

      //? getUsers
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.message = action.payload;
      })

      //? deleteUser
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.message = action.payload;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.message = action.payload;
      })

      //? change Password
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        toast.error(action.payload);
      })
      //? forgotPassword
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      //? resetPassword
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        toast.error(action.payload);
      })

      //? send Verification Email
      .addCase(sendVerificationEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendVerificationEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(sendVerificationEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        toast.error(action.payload);
      })

      //? verify User
      .addCase(verifyUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export default userSlice.reducer;
