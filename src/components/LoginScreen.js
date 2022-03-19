import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, signUp } from "../auth/authApi";
import "./LoginScreen.css";

const LoginScreen = ({ checkUser }) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const { error, status } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const createUserHandler = (event) => {
    event.preventDefault();
    dispatch(
      signUp({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
    );
  };
  const loginUserHandler = (event) => {
    event.preventDefault();
    dispatch(
      login({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
    );
  };

  return (
    <div className="signUp" onSubmit={loginUserHandler}>
      <form>
        <h1>Sign In</h1>
        <input type="email" placeholder="Email" ref={emailRef} />
        <input type="password" placeholder="Password" ref={passwordRef} />
        {error}
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
