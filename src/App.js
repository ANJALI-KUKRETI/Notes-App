import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Header from "./components/header/Header";
import Palatte from "./components/palatte/Palatte";
import CardHolder from "./components/cardHolder/CardHolder";
import "./App.css";

function App() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("Sticky-Notes")) || []
  );

  const [complete, setComplete] = useState(
    JSON.parse(localStorage.getItem("complete")) || []
  );

  // const [showEye, setShowEye] = useState(true);
  // let showEye = true;
  // if (window.location.pathname === "/personal") {
  //   showEye = false;
  // }
  useEffect(() => {
    localStorage.setItem("Sticky-Notes", JSON.stringify(notes));
  }, [notes]);
  useEffect(() => {
    localStorage.setItem("complete", JSON.stringify(complete));
  }, [complete]);

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
    if (window.location.pathname === "/complete") {
      const temps = [...complete];
      temps.push({
        text: "",
        date: formatDate(),
        color,
        id: Date.now(),
      });
      setComplete(temps);
    } else {
      const temp = [...notes];
      temp.push({
        text: "",
        date: formatDate(),
        color,
        id: Date.now(),
      });
      setNotes(temp);
    }
  };
  const deleteNoteHandler = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
    setComplete(complete.filter((note) => note.id !== id));
  };
  const updateNoteHandler = (text, id) => {
    const temp = [...notes];
    const i = temp.findIndex((note) => note.id === id);
    temp[i].text = text;
    setNotes(temp);
  };

  const updateCompleteNoteHandler = (text, id) => {
    const temp = [...complete];
    const i = temp.findIndex((note) => note.id === id);
    temp[i].text = text;
    setComplete(temp);
  };

  const completeNoteHandler = (id) => {
    const temp = [...notes];
    // const pTemp = [...personal];
    setNotes(temp.filter((note) => note.id !== id));
    const t = temp.findIndex((note) => note.id === id);
    console.log(t);
    setComplete((old) => [...old, temp[t]]);
  };

  return (
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
                  onDone={completeNoteHandler}
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
                  onUpdate={updateCompleteNoteHandler}
                  eye={false}
                />
              }
            />
          </Routes>
        </div>
      </Layout>
    </>
  );
}

export default App;
