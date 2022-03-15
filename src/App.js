import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Header from "./components/header/Header";
import Palatte from "./components/palatte/Palatte";
import CardHolder from "./components/cardHolder/CardHolder";
import { colRef, db } from "./firebase";
import "./App.css";
import LoginScreen from "./components/LoginScreen";
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
} from "firebase/firestore";

function App() {
  const [user, setUser] = useState("A");
  let [notes, setNotes] = useState([]);
  const [complete, setComplete] = useState([]);

  const initials = query(
    colRef,
    where("completed", "==", false),
    orderBy("createdAt", "desc")
  );
  console.log(initials);
  useEffect(() => {
    onSnapshot(initials, (snapshot) => {
      let fecthNotes = [];
      snapshot.docs.forEach((doc) => {
        fecthNotes.push({ ...doc.data(), id: doc.id });
      });
      console.log(notes);
      setNotes(fecthNotes);
    });
  }, []);

  const completed = query(colRef, where("completed", "==", true));
  useEffect(() => {
    onSnapshot(completed, (snapshot) => {
      let completedNotes = [];
      snapshot.docs.forEach((doc) => {
        completedNotes.push({ ...doc.data(), id: doc.id });
      });
      console.log(notes);
      setComplete(completedNotes);
    });
  }, []);
  console.log(complete);
  console.log(notes);

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
    addDoc(colRef, {
      text: "Hello",
      color,
      date: formatDate(),
      completed: false,
      createdAt: serverTimestamp(),
    });
    // setNotes(notes);
  };

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
    setNotes(notes);
    setComplete(complete);
  };

  return (
    <>
      {!user ? (
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
                      notes={notes}
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
