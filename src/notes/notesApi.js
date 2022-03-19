import { createAsyncThunk } from "@reduxjs/toolkit";
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

const colRef = collection(db, "notes");

export const addNoteToPile = createAsyncThunk(
  "addNote",
  async ({ color, date, completed, createdAt, uid }) => {
    try {
      addDoc(colRef, {
        text: "",
        color,
        date,
        completed,
        createdAt,
        currentUID: uid,
      });
    } catch (error) {
      return error.message;
    }
  }
);
