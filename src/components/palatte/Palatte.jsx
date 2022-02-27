import React from "react";
import ColorPalatte from "../ColorPalatte/ColorPalatte";
import "./palatte.css";
import { FaPlusCircle } from "react-icons/fa";

const palatte = () => {
  return (
    <div className="pal">
      <div className="add">
        <FaPlusCircle />
      </div>
      <ColorPalatte />
    </div>
  );
};

export default palatte;
