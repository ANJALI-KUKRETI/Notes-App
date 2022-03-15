import { useEffect } from "react";
import React, { useRef } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "./LoginScreen.css";

const LoginScreen = ({ checkUser }) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const createUserHandler = () => {
    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((cred) => {
        // checkUser(cred.user);
        console.log(cred);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const loginUserHandler = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((cred) => {
        // checkUser(cred.user);
        console.log(cred);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="signUp">
      <form onSubmit={loginUserHandler}>
        <h1>Sign In</h1>
        <input type="email" placeholder="Email" ref={emailRef} />
        <input type="password" placeholder="Password" ref={passwordRef} />
        <button type="submit" className="signInBtn">
          Sign In
        </button>
        <div>
          <span style={{ color: "gray" }}>Don't have account? </span>
          <span className="signup_link" onClick={createUserHandler}>
            SignUp Now
          </span>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;
