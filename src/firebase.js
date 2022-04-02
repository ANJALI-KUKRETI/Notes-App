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
  appId: "1:856127194897:web:1e917e31d928576d5aeeb0",
  measurementId: "G-JKQKCWS36M",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();

export default app;
