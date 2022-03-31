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
    const init = query(
      colRef,
      where("completed", "==", false),
      where("currentUID", "==", user),
      orderBy("createdAt", "desc")
    );
    const res = await getDocs(init);
    console.log(res.docs);
    return res;
    //  onSnapshot(init, (snapshot) => {
    //   let fetchNotes = [];
    //   snapshot.docs.forEach((doc) => {
    //     fetchNotes.push({ ...doc.data(), id: doc.id });
    //     // console.log(fetchNotes);
    //   });
    //   console.log(fetchNotes);
    //   return fetchNotes;
    // });
    // return res;
    // console.log(initialNotes);
    // return initialNotes;
  }
);
export const initialState = {
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
      // .addCase(getInitials.fulfilled, (state, action) => {
      //   console.log(action);
      // state.initials = [...payload];
      // console.log(payload);
      // console.log(state.initials);
      // });
      .addCase(getInitials.fulfilled, (state, { payload }) => {
        const res = payload.docs.map((d) => d.data());
        state.initials = res;
      });
  },
});
export const getNotes = (state) => state.notes;
export const getInitialNotes = (state) => state.initials;
export default notesSlice.reducer;
