import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="nav">
      <div className="logo">
        <h1> Sticky Notes</h1>
      </div>
      <div className="links">
        <ul>
          <NavLink
            className={(navdata) => (navdata.isActive ? "active" : "link")}
            to="/"
          >
            <li>
              <h3>All Notes</h3>
            </li>
          </NavLink>
          <NavLink
            className={(navdata) => (navdata.isActive ? "active" : "link")}
            to="/complete"
          >
            <li>
              <h3>Completed</h3>
            </li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Header;
