import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Header from "./components/header/Header";
import Palatte from "./components/palatte/Palatte";
import CardHolder from "./components/cardHolder/CardHolder";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import "./App.css";
import LoginScreen from "./components/LoginScreen";
import {
  createNote,
  getInitials,
  getInitialNotes,
  getNotes,
} from "./reducers/notesSlice";
import {
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  updateDoc,
  collection,
} from "firebase/firestore";
import { removeUser, setUser } from "./reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { addNote } from "./reducers/notesSlice";
function App() {
  const user = useSelector((state) => state.user);
  const notes = useSelector(getNotes);
  const initials = useSelector(getInitialNotes);
  const dispatch = useDispatch();

  // Should be notes.initials
  console.log(notes.initials);

  useEffect(async () => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(setUser(userAuth.uid));
      } else {
        dispatch(setUser(null));
      }
    });
  }, []);

  useEffect(() => {
    if (user.user !== undefined) {
      dispatch(getInitials(user));
    }
    // user should be passed into this array since user's state will change on mount
  }, [user]);
  const [complete, setComplete] = useState([]);

  const formatDate = () => {
    const d = new Date();
    const date = d.getDate();
    let nDate, nMonth;
    if (date > 9) {
      nDate = date;
    } else {
      nDate = `0${date}`;
    }
    const month = d.getMonth() + 1;
    if (month > 9) {
      nMonth = month;
    } else {
      nMonth = `0${month}`;
    }
    const year = d.getFullYear();
    return `${nDate}/${nMonth}/${year}`;
  };

  const addNoteHandler = (color) => {
    dispatch(
      createNote({
        color: color,
        date: formatDate(),
        completed: false,
        createdAt: serverTimestamp(),
        uid: user.user,
        // id: Math.random(),
      })
    );
  };

  const deleteNoteHandler = (id) => {
    console.log(id);
    // dispatch(deleteNoteFromFire({ id: id }));
  };
  const updateNoteHandler = (text, id) => {
    console.log(id);
    const docRef = doc(db, "notes", id);
    console.log(docRef);
    updateDoc(docRef, {
      text,
    }).then(() => {
      console.log("updated");
    });
  };

  const updateCompleteNoteHandler = (id) => {
    const docRef = doc(db, "notes", id);
    updateDoc(docRef, {
      completed: true,
    });
  };
  return (
    <>
      {!user?.user ? (
        <LoginScreen />
      ) : (
        <>
          <Header />
          <Layout>
            <div className="main">
              <Palatte addNote={addNoteHandler} />
              <Routes>
                <Route
                  path="/"
                  element={
                    <CardHolder
                      notes={notes.initials}
                      onDelete={deleteNoteHandler}
                      onUpdate={updateNoteHandler}
                      onDone={updateCompleteNoteHandler}
                      eye={true}
                    />
                  }
                />
                <Route
                  path="/complete"
                  element={
                    <CardHolder
                      notes={complete}
                      onDelete={deleteNoteHandler}
                      onUpdate={updateNoteHandler}
                      eye={false}
                    />
                  }
                />
              </Routes>
            </div>
          </Layout>
        </>
      )}
    </>
  );
}

export default App;
