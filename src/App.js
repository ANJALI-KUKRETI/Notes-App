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
} from "firebase/firestore";

function App() {
  let [notes, setNotes] = useState([]);
  const [complete, setComplete] = useState([]);

  const initials = query(colRef, orderBy("createdAt", "desc"));

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

  const completed = query(colRef, where("completed", "==", "true"));
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
  // const [notes, setNotes] = useState(
  //   JSON.parse(localStorage.getItem("Sticky-Notes")) || []
  // );

  // const [complete, setComplete] = useState(
  //   JSON.parse(localStorage.getItem("complete")) || []
  // );
  const [user, setUser] = useState("A");
  // useEffect(() => {
  //   localStorage.setItem("Sticky-Notes", JSON.stringify(notes));
  // }, [notes]);
  // useEffect(() => {
  //   localStorage.setItem("complete", JSON.stringify(complete));
  // }, [complete]);

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
    // setNotes(notes.filter((note) => note.id !== id));
    // setComplete(complete.filter((note) => note.id !== id));
    const docRef = doc(db, "notes", id);
    deleteDoc(docRef);
  };
  const updateNoteHandler = (text, id) => {
    const temp = [...notes];
    const i = temp.findIndex((note) => note.id === id);
    temp[i].text = text;
    setNotes(temp);
  };

  // const updateCompleteNoteHandler = (text, id) => {
  //   const temp = [...complete];
  //   const i = temp.findIndex((note) => note.id === id);
  //   temp[i].text = text;
  //   setComplete(temp);
  // };

  // const completeNoteHandler = (id) => {
  //   const temp = [...notes];
  //   // const pTemp = [...personal];
  //   setNotes(temp.filter((note) => note.id !== id));
  //   const t = temp.findIndex((note) => note.id === id);
  //   console.log(t);
  //   setComplete((old) => [...old, temp[t]]);
  // };

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
              {/* <Palatte /> */}
              <Routes>
                <Route
                  path="/"
                  element={
                    <CardHolder
                      notes={notes}
                      onDelete={deleteNoteHandler}
                      onUpdate={updateNoteHandler}
                      // onDone={completeNoteHandler}
                      eye={true}
                    />
                  }
                />
                <Route
                  path="/complete"
                  element={
                    <CardHolder
                      // notes={complete}
                      onDelete={deleteNoteHandler}
                      // onUpdate={updateCompleteNoteHandler}
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
