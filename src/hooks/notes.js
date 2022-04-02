import { useSelector, useDispatch } from "react-redux";
import formatDate from "../utils/format-date";
import { serverTimestamp } from "firebase/firestore";
import {
  completeNote,
  createNote,
  deleteNote,
  getCompleted,
} from "../reducers/notesSlice";
import { db } from "../firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

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
    dispatch(deleteNote(id));
  };

  const updateNoteHandler = (text, id) => {
    console.log(text);
    const docRef = doc(db, "notes", id);
    updateDoc(docRef, {
      text,
    }).then(() => {
      console.log("updated");
    });
  };

  const updateCompleteNoteHandler = (id, user) => {
    dispatch(completeNote({ id: id, user: user }));
    dispatch(getCompleted(user));
  };

  return {
    addNoteHandler,
    deleteNoteHandler,
    updateNoteHandler,
    updateCompleteNoteHandler,
  };
}
