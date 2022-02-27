import React from "react";
import "./Header.css";
import { FiMoon } from "react-icons/fi";

const Header = () => {
  return (
    <div className="nav">
      <div className="logo">
        <h1> Sticky Notes</h1>
      </div>
      <div className="links">
        <ul>
          <li>
            <h3>All</h3>
          </li>
          <li>
            <h3>Personal </h3>
          </li>
          <li class="mode">
            <div>
              <FiMoon />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
