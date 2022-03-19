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
import { addNoteToPile } from "./notes/notesApi";
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
import { removeUser, setUser } from "./reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { addNote } from "./reducers/notesSlice";
function App() {
  // const [user, setUser] = useState(null);
  // let [notes, setNotes] = useState([]);
  const user = useSelector((state) => state.user);
  const notes = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  console.log(notes);

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(setUser(userAuth.uid));
      } else {
        dispatch(setUser(null));
      }
    });
  }, []);

  console.log(user);
  const [complete, setComplete] = useState([]);

  const colRef = collection(db, "notes");

  // const initials = query(
  //   colRef,
  //   where("completed", "==", false),
  //   where("currentUID", "==", user),
  //   orderBy("createdAt", "desc")
  // );
  // const completed = query(
  //   colRef,
  //   where("completed", "==", true),
  //   where("currentUID", "==", user)
  // );

  useEffect(() => {
    // ===================Adding notes============
    // onSnapshot(initials, (snapshot) => {
    //   let fecthNotes = [];
    //   snapshot.docs.forEach((doc) => {
    //     fecthNotes.push({ ...doc.data(), id: doc.id });
    //   });
    //   setNotes(fecthNotes);
    // });
    //=======================completed Notes===========
    // onSnapshot(completed, (snapshot) => {
    //   let completedNotes = [];
    //   snapshot.docs.forEach((doc) => {
    //     completedNotes.push({ ...doc.data(), id: doc.id });
    //   });
    //   setComplete(completedNotes);
    // });
  }, []);

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
      addNoteToPile({
        color: color,
        date: { formatDate },
        completed: false,
        createdAt: serverTimestamp(),
        uid: user.user,
      })
    );
  };
  // addDoc(colRef, {
  //   text: "",
  //   color,
  //   date: formatDate(),
  //   completed: false,
  //   createdAt: serverTimestamp(),
  //   currentUID: user,
  // });

  const deleteNoteHandler = (id) => {
    const docRef = doc(db, "notes", id);
    deleteDoc(docRef);
  };
  const updateNoteHandler = (text, id) => {
    const docRef = doc(db, "notes", id);
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
              {/* <Palatte /> */}
              <Routes>
                <Route
                  path="/"
                  element={
                    <CardHolder
                      notes={notes.notes}
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
