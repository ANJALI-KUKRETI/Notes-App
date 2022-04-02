import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Header from "./components/header/Header";
import Palatte from "./components/palatte/Palatte";
import CardHolder from "./components/cardHolder/CardHolder";
import "./App.css";
import LoginScreen from "./components/LoginScreen";
import { getCompleted, getInitials } from "./reducers/notesSlice";
import { useDispatch, useSelector } from "react-redux";
import useFetchUser from "./hooks/fetch-user";
import useNotesFirestore from "./hooks/notes";

function App() {
  const user = useSelector((state) => state.user);
  const notes = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  // Moved the whole code block to a new custom hook
  useFetchUser();

  // Abstracted away all the functions into another custom hook
  const {
    addNoteHandler,
    deleteNoteHandler,
    updateNoteHandler,
    updateCompleteNoteHandler,
  } = useNotesFirestore();

  useEffect(() => {
    if (user.user !== undefined && user.user !== null) {
      dispatch(getInitials(user));
      dispatch(getCompleted(user));
    }
  }, [user]);

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
                      notes={notes.completed}
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
