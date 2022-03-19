import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/authSlice";
import notesReducer from "../reducers/notesSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    notes: notesReducer,
  },
});
