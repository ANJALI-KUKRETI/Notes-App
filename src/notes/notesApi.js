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
import { addNote } from "../reducers/notesSlice";

const colRef = collection(db, "notes");

export const addNoteOnFirestore = ({
  color,
  date,
  completed,
  createdAt,
  uid,
}) => {
  return async (dispatch) => {
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
    } catch (error) {
      return error.message;
    }
    dispatch(
      addNote({
        text: "",
        color,
        date,
        completed,
        createdAt,
        currentUID: uid,
      })
    );
  };
};

export const editNoteFireBase = (text, id) => {
  const docRef = doc(db, "notes", id);
  updateDoc(docRef, {
    text,
  }).then(() => {
    console.log("updated");
  });
};
// async ({ color, date, completed, createdAt, uid }) => {
//   try {
//     const note = {
//       text: "",
//       color,
//       date,
//       completed,
//       createdAt,
//       currentUID: uid,
//     };
//     addDoc(colRef, note);
//   } catch (error) {
//     return error.message;
//   }
// }
