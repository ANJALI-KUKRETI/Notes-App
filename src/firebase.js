import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBb_CUwiB8JoShlChssboEXod50uDi7HkQ",
  authDomain: "test-3314c.firebaseapp.com",
  databaseURL:
    "https://test-3314c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test-3314c",
  storageBucket: "test-3314c.appspot.com",
  messagingSenderId: "856127194897",
  appId: "1:856127194897:web:f1b1bba06a0a74385aeeb0",
  measurementId: "G-VWSWWGVB9V",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
// export const colRef = collection(db, "notes");

export default app;
