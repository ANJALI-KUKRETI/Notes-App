import { useSelector, useDispatch } from "react-redux";
import formatDate from "../utils/format-date";
import { serverTimestamp } from "firebase/firestore";
import { createNote } from "../reducers/notesSlice";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function useNotesFirestore() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const addNoteHandler = (color) => {
    dispatch(
      createNote({
        color: color,
        date: formatDate(),
        completed: false,
        createdAt: serverTimestamp(),
        uid: user.user,
      })
    );
  };

  const deleteNoteHandler = (id) => {
    console.log(id);
  };
  const updateNoteHandler = (text, id) => {
    console.log(id);
  };

  const updateCompleteNoteHandler = (id) => {
    const docRef = doc(db, "notes", id);
    updateDoc(docRef, {
      completed: true,
    });
  };

  return {
    addNoteHandler,
    deleteNoteHandler,
    updateNoteHandler,
    updateCompleteNoteHandler,
  };
}
