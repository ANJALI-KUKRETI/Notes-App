import React, { useRef, useState } from "react";
import "./LoginScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "./authAPI";
import { selectUser } from "./authSlice";

const LoginScreen = ({ checkUser }) => {
  const dispatch = useDispatch()
  const { error,status } = useSelector(selectUser)
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  return (
    <div className="signUp">
      <form onSubmit={e=>{
        e.preventDefault()
          dispatch(
            login({
           email:emailRef.current.value,
           password:passwordRef.current.value
          })
          )
        }}>
        <h1>Sign In</h1>
        <input type="email" placeholder="Email" ref={emailRef} />
        <input type="password" placeholder="Password" ref={passwordRef} />
        {error}
        <button type="submit" className="signInBtn">
         {status === 'pending'?'Signing in ...':'Sign In'}
        </button>
        <div>
          <span style={{ color: "gray" }}>Don't have account? </span>
          <span className="signup_link" 
          onClick={e=>
           { 
             e.preventDefault()
             dispatch(signup({
              email:emailRef.current.value,
              pasword:passwordRef.current.value
              }))
              }}>
            SignUp Now
          </span>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;
