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
    // console.log(user);
    const init = query(
      colRef,
      where("completed", "==", false),
      where("currentUID", "==", user),
      orderBy("createdAt", "desc")
    );
    let initialNotes = [];
    onSnapshot(init, (snapshot) => {
      let fetchNotes = [];
      snapshot.docs.forEach((doc) => {
        fetchNotes.push({ ...doc.data(), id: doc.id });
        // console.log(fetchNotes);
      });
      initialNotes = [...fetchNotes];
      console.log(initialNotes);
    });
    console.log(initialNotes);
    return initialNotes;
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
        state.initials = [...payload];
        console.log(payload);
        console.log(state.initials);
      });
  },
});
export const getNotes = (state) => state.notes;
export const getInitialNotes = (state) => state.initials;
export default notesSlice.reducer;
