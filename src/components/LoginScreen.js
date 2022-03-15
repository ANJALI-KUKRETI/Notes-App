import React, { useRef } from "react";
// import { auth } from "../firebase";
import "./LoginScreen.css";

const LoginScreen = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  return (
    <div className="signUp">
      <form>
        <h1>Sign In</h1>
        <input type="email" placeholder="Email" ref={emailRef} />
        <input type="password" placeholder="Password" ref={passwordRef} />
        <button type="submit" className="signInBtn">
          Sign In
        </button>
        <div>
          <span style={{ color: "gray" }}>Don't have account? </span>
          <span className="signup_link">SignUp Now</span>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;
