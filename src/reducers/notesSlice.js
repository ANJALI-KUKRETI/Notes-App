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
    console.log(user);
    const init = query(
      colRef,
      where("completed", "==", false),
      where("currentUID", "==", user),
      orderBy("createdAt", "desc")
    );
    console.log(init);
    // return init;
    const initialNotes = [];
    onSnapshot(init, (snapshot) => {
      let fecthNotes = [];
      snapshot.docs.forEach((doc) => {
        fecthNotes.push({ ...doc.data(), id: doc.id });
        console.log(fecthNotes);
        initialNotes = fecthNotes;
      });
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
  extraReducers: {
    [createNote.fulfilled]: (state, { payload }) => {
      return { ...state, notes: [...state.notes, payload] };
    },
    [getInitials.fulfilled]: (state, { payload }) => {
      console.log(payload);
      return { ...state, initials: [payload] };
    },
  },
});
export const getNotes = (state) => state.notes;
export const Initials = (state) => state.initials;
export default notesSlice.reducer;
