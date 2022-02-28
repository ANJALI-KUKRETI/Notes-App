import React from "react";
import "./palatte.css";
import Color from "./Color";

const palatte = (props) => {
  const colors = [
    "aqua",
    "rgb(247, 192, 125)",
    "rgb(223, 169, 178)",
    "rgb(193, 236, 127)",
    "rgb(131, 206, 241)",
    "rgb(238, 238, 113)",
    "rgb(240, 116, 116)",
    "rgb(241, 88, 241)",
    "rgb(238, 175, 39)",
  ];
  return (
    <div className="palatte">
      <ul>
        {colors.map((color, index) => (
          <Color color={color} key={index} addNote={props.addNote} />
        ))}
      </ul>
    </div>
  );
};

export default palatte;
