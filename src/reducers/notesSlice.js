import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../firebase";
import {
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  updateDoc,
  collection,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { async } from "@firebase/util";
// import { createNote } from "../notes/notesApi";
const colRef = collection(db, "notes");

export const createNote = createAsyncThunk(
  "notes/setNotes",
  async ({ color, date, completed, createdAt, uid }) => {
    try {
      const note = {
        text: "",
        color,
        date,
        completed,
        createdAt,
        currentUID: uid,
      };
      addDoc(colRef, note);
      return note;
    } catch (err) {
      return err.message;
    }
  }
);
export const getInitials = createAsyncThunk(
  "notes/initials",
  async ({ user }) => {
    // This one is much leaner than onSnapShot
    const init = query(colRef);
    const res = await getDocs(init);
    return res;
  }
);
const initialState = {
  notes: [],
  initials: [],
  status: "loading",
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNote.fulfilled, (state, { payload }) => {
        state.notes = [payload, ...state.notes];
      })
      .addCase(getInitials.fulfilled, (state, { payload }) => {
        // This is where things were going wrong for you.
        const res = payload.docs.map((d) => d.data());
        state.initials = res;
      });
  },
});
export const getNotes = (state) => state.notes;
export const getInitialNotes = (state) => state.initials;
export default notesSlice.reducer;
