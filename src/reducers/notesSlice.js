import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// export const addNoteToFirebase = createAsyncThunk();
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
      const payLoad = action.payload;
      const newNote = {
        text: "",
        color: payLoad.color,
        date: payLoad.date,
        completed: payLoad.completed,
        createdAt: payLoad.createdAt,
        currentUID: payLoad.currentUID,
      };

      state.notes = [newNote, ...state.notes];
      state.status = "idle";
    },
  },
});
export const { addNote } = notesSlice.actions;
export default notesSlice.reducer;
