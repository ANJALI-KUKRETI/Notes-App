import { useState } from "react";
import Layout from "./components/Layout";
import Header from "./components/header/Header";
import Palatte from "./components/palatte/Palatte";
import CardHolder from "./components/cardHolder/CardHolder";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);

  const addNoteHandler = (color) => {
    const temp = [...notes];
    temp.push({
      text: "",
      date: Date.now(),
      color,
      id: new Date().getTime().toString(),
    });
    setNotes(temp);
  };
  return (
    <>
      <Header />
      <Layout>
        <div className="main">
          <Palatte addNote={addNoteHandler} />
          <CardHolder notes={notes} />
        </div>
      </Layout>
    </>
  );
}

export default App;
