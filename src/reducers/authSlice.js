import { createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import { login, signUp } from "../auth/authApi";

const initialState = {
  user: undefined,
  status: "loading",
  error: null,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.status = "idle";
    },
    removeUser: (state) => {
      state.user = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.status = "pending";
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        if (isRejectedWithValue(action)) {
          state.status = "idle";
          state.error = action.payload;
        }
      })
      .addCase(login.pending, (state) => {
        state.status = "pending";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        if (isRejectedWithValue(action)) {
          state.status = "idle";
          state.error = action.payload;
        }
      });
  },
});

export const { setUser, removeUser } = authSlice.actions;

export default authSlice.reducer;
