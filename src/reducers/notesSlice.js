import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase";
import {
  query,
  collection,
  getDocs,
  setDoc,
  getDoc,
  doc,
  where,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export const createNote = createAsyncThunk(
  "notes/setNotes",
  async ({ color, date, completed, createdAt, uid }) => {
    try {
      const id = uuidv4();
      const note = {
        text: "",
        color,
        date,
        completed,
        createdAt,
        currentUID: uid,
        id: id,
      };
      await setDoc(doc(db, `notes/${id}`), note);
      const res = await getDoc(doc(db, "notes", id));
      return res.data();
    } catch (err) {
      return err.message;
    }
  }
);
export const getInitials = createAsyncThunk(
  "notes/initials",
  async ({ user }) => {
    const init = query(
      collection(db, "notes"),
      where("currentUID", "==", user),
      where("completed", "==", false)
    );
    const res = await getDocs(init);
    return res;
  }
);
export const initialState = {
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
        state.initials = [payload, ...state.initials];
      })

      .addCase(getInitials.fulfilled, (state, { payload }) => {
        const res = payload.docs.map((d) => d.data());
        state.initials = res;
      });
  },
});

export const getInitialNotes = (state) => state.initials;
export default notesSlice.reducer;
