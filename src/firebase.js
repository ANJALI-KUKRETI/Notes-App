import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC9Mb8h0XILZ4TtIPaTORLEpgRNmBQoRRQ",
  authDomain: "notes-taking-app-2e16a.firebaseapp.com",
  projectId: "notes-taking-app-2e16a",
  storageBucket: "notes-taking-app-2e16a.appspot.com",
  messagingSenderId: "296389316236",
  appId: "1:296389316236:web:8efd994e094bd5ee4c35a9",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const colRef = collection(db, "notes");
// const auth = firebase.auth();

export default app;
