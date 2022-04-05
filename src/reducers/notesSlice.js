import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase";
import {
  query,
  collection,
  getDocs,
  setDoc,
  getDoc,
  deleteDoc,
  doc,
  where,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { async } from "@firebase/util";

// ===========================Create new note======================

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
      console.log(res.data());
      return res.data();
    } catch (err) {
      return err.message;
    }
  }
);

// ========================get initial notes========================
export const getInitials = createAsyncThunk(
  "notes/initials",
  async ({ user }) => {
    const init = query(
      collection(db, "notes"),
      where("currentUID", "==", user),
      where("completed", "==", false),
      orderBy("createdAt", "desc")
    );
    const res = await getDocs(init);
    return res;
  }
);

// =========================Delete Note==============================
export const deleteNote = createAsyncThunk("notes/deleteNote", async (id) => {
  const docRef = doc(db, "notes", id);
  await deleteDoc(docRef);
  return id;
});

// ===============================Set completed===================
export const completeNote = createAsyncThunk(
  "notes/completeNote",
  async ({ id, user }) => {
    const docRef = doc(db, "notes", id);
    await updateDoc(docRef, {
      completed: true,
    });
    const init = query(
      collection(db, "notes"),
      where("currentUID", "==", user),
      where("completed", "==", true),
      orderBy("createdAt", "desc")
    );
    const res = await getDocs(init);
    return { res, id };
  }
);

// =========================Get completed=======================
export const getCompleted = createAsyncThunk(
  "notes/getCompleted",
  async ({ user }) => {
    const init = query(
      collection(db, "notes"),
      where("currentUID", "==", user),
      where("completed", "==", true)
    );
    const res = await getDocs(init);
    return res;
  }
);

// =========================Update text========================
export const updateNote = createAsyncThunk(
  "notes/updateNotes",
  async ({ text, id }) => {
    const docRef = doc(db, "notes", id);
    updateDoc(docRef, {
      text: text,
    }).then(() => {});
    console.log(docRef);
    return { text, docRef };
  }
);

export const initialState = {
  initials: [],
  completed: [],
  status: "loading",
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNote.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.initials = [payload, ...state.initials];
      })
      .addCase(getInitials.fulfilled, (state, { payload }) => {
        const res = payload.docs.map((d) => d.data());
        state.initials = res;
      })
      .addCase(deleteNote.fulfilled, (state, { payload }) => {
        state.initials = state.initials.filter((init) => init.id !== payload);
        state.completed = state.completed.filter((init) => init.id !== payload);
      })
      .addCase(completeNote.fulfilled, (state, { payload }) => {
        const { res, id } = payload;
        state.initials = state.initials.filter((init) => init.id !== id);
        state.completed = res.docs.map((d) => d.data());
      })
      .addCase(getCompleted.fulfilled, (state, { payload }) => {
        state.completed = payload.docs.map((d) => d.data());
      });
    // .addCase(updateNote.fulfilled, (state, { payload }) => {
    //   console.log(state.initials);
    // });
  },
});

export default notesSlice.reducer;
