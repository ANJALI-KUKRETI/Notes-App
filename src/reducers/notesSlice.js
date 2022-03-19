import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [],
  status: "loading",
  // note: {
  //   text: "",
  //   color: "",
  //   date: "",
  //   completed: false,
  //   createdAt: "",
  //   currentUID: null,
  // },
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action) => {
      // note = action.payload;
      state.notes = [action.payload, ...state.notes];
    },
  },
});
export const { addNote } = notesSlice.actions;
export default notesSlice.reducer;
