import React, { useEffect } from 'react';
// import { Counter } from './features/counter/Counter';
import './App.css';
import Header from './components/header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginScreen from './features/auth/LoginScreen';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import { setUser } from './features/auth/authSlice';

function App() {
  const user = useSelector(state=>state.user)
  const dispatch = useDispatch()
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
  if (user.status === 'loading') return<div>Loading ...</div>
  return (
    <div className="App">
      <BrowserRouter>
      {!user?.user ? (
        <LoginScreen />
      ) : (
        <>
        <div
        style={{textAlign: 'center'}}
        >
          <div>
            signin success!
          </div>
          <button
          onClick={()=>signOut(auth)}
          >
            signout
          </button>
        </div>
          {/* <Header />
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
          </Layout> */}
        </>
      )}
            {/* <Header /> */}
          {/* <Routes>
            <Route>
              
            </Route>
          </Routes> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
